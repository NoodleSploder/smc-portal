import { useEffect, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';

type TerminalProps = {
  sessionName: string;
  active: boolean;
};

export default function TerminalBox({ sessionName, active }: TerminalProps) {
  console.log('TerminalBox loaded...');
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const xterm = useRef<XTerm | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const resizeTerminal = () => {
    if (!fitAddon.current || !xterm.current || !terminalRef.current) return;
    const dims = fitAddon.current.proposeDimensions();
    if (dims) {
      console.log(`[${sessionName}] Resize: ${dims.cols}x${dims.rows}`);
      xterm.current.resize(dims.cols, dims.rows);
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ resize: dims }));
      } else {
        console.warn(`[${sessionName}] WebSocket not ready`);
      }
    }
  };

  useEffect(() => {
    console.log(`TerminalBox useEffect triggered. Active: ${active}, terminalRef:`, terminalRef.current);

    if (!terminalRef.current) return;
    
    console.log(`Setting up terminal for session: ${sessionName}`);

    const term = new XTerm({
      cols: 80,
      rows: 24,
      cursorBlink: true,
      theme: {
        background: '#1a202c',
      },
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(terminalRef.current);
    fit.fit();

    xterm.current = term;
    fitAddon.current = fit;

    term.write('Connecting to tmux...\r\n');

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws?session=${sessionName}`);

    socket.onopen = () => {
      term.write('\r\nConnected\r\n');
      term.focus();
      resizeTerminal();
    };

    socket.onmessage = (event) => {
      term.write(event.data);
    };

    socket.onclose = () => {
      term.write('\r\n[Disconnected]');
    };

    term.onData(data => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ input: data }));
      }
    });

    // ResizeObserver setup
    const observer = new ResizeObserver(() => {
      console.log(`[${sessionName}] ResizeObserver triggered`);
      resizeTerminal();
    });

    observer.observe(terminalRef.current);
    resizeObserverRef.current = observer;

    return () => {
      socket.close();
      term.dispose();
      observer.disconnect();
    };
  }, []);


  return (
    <Box 
      ref={terminalRef} 
      width="100%" 
      height="100%" 
      bg="gray.800"
      overflow="hidden"
    />
  );
};

