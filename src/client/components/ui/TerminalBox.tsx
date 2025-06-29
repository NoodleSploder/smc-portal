import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
//import 'xterm/css/xterm.css';


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

  const resizeTerminal = () => {
    if (!terminalRef.current || !xterm.current || !fitAddon.current) return;

    fitAddon.current.fit();
    const dims = fitAddon.current.proposeDimensions();
    if (dims) {
      xterm.current.resize(dims.cols, dims.rows);

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ resize: dims }));
      } else {
        console.warn(`[${sessionName}] WebSocket not ready`);
      }
    }
  };

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cols: 120,
      rows: 30,
      cursorBlink: true,
      theme: { background: '#1a202c' }
    });

    const fit = new FitAddon();

    term.loadAddon(fit);
    fit.fit();

    xterm.current = term;
    fitAddon.current = fit;

    term.open(terminalRef.current);
    resizeTerminal();

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws?session=${sessionName}`);
    socketRef.current = socket;

    socket.onopen = () => {
      term.writeln('\r\n[WS Connected]');
      resizeTerminal();
      term.focus();
    };

    socket.onmessage = (event) => {
      term.write(event.data);
    };

    socket.onclose = () => {
      term.writeln('\r\n[Disconnected]');
    };

    term.onData(data => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ input: data }));
      }
    });

    // ResizeObserver
    const observer = new ResizeObserver(() => {
      console.log(`[${sessionName}] ResizeObserver triggered`);
      resizeTerminal();
    });
    observer.observe(terminalRef.current);
    resizeObserverRef.current = observer;

    // window resize fallback
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
    <Box
      ref={terminalRef}
      bg="gray.800"
      height="calc(100vh - 150px)" // adjust to match header/footer if any
      width="100%"
      overflow="hidden"
    />
  );
}
