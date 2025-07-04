import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

type TerminalProps = {
  sessionName: string;
  active: boolean;
};

export default function TerminalBox({ sessionName }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const xterm = useRef<XTerm | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const rows = 80;

  useEffect(() => {
    if (!terminalRef.current) return;


  const term = new XTerm({
    cols: 100,
    rows: rows,
    cursorBlink: true,
    theme: {
      background: '#1a202c',
      foreground: '#f8f8f2',
      black: '#000000',
      white: '#ffffff',
      brightGreen: '#50fa7b',
      brightBlue: '#8be9fd',
      brightYellow: '#f1fa8c',
    },
  });

  const resizeTerminal = () => {
    if (!terminalRef.current || !xterm.current || !fitAddon.current) return;

    fitAddon.current.fit();

    const dims = fitAddon.current.proposeDimensions();

    if (dims) {
      xterm.current.resize(dims.cols, rows);

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ resize: dims }));
      }
    }
  };

    const fit = new FitAddon();
    term.loadAddon(fit);

    xterm.current = term;
    fitAddon.current = fit;

    term.open(terminalRef.current);

    // Ensure the first fit happens AFTER DOM paint
    requestAnimationFrame(() => {
      fit.fit();
      resizeTerminal();
    });

    // Setup WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws?session=${sessionName}`);
    socketRef.current = socket;

    socket.onopen = () => {
      term.write('\r\nWS Connected\r\n');
      resizeTerminal();
      term.focus();
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

    // ResizeObserver
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resizeTerminal();
        });
      });
    });

    observer.observe(terminalRef.current);
    resizeObserverRef.current = observer;

    // Window resize fallback
    const handleWindowResize = () => resizeTerminal();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      term.dispose();
      socket.close();
      observer.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [sessionName]);

  return (
    <Box display="flex" flex="1" width="100%" height="1360px" minH="1360px">
      <Box
        ref={terminalRef}
        flex="1"
        width="100%"
        height="1360px"
        minH="1360px"
        overflow="hidden"
        style={{
          backgroundColor: "black",
        }}
      />
    </Box>
  );
}
