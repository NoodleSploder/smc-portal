import { WebSocketServer } from 'ws';
import { parse } from 'url';
import http from 'http';
import { execSync } from 'child_process';
import pty, { IPty } from '@lydell/node-pty';
import { IncomingMessage } from 'http';

export function setupTmuxWebSocket(server: http.Server) {

  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    const { pathname, query } = parse(req.url || '', true);
    if (pathname === '/ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, query);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws: WebSocket, query: IncomingMessage) => {

    // @ts-expect-error
    const sessionName = query?.session as string || 'default';

    try {
      execSync(`tmux has-session -t ${sessionName}`);
      console.log(`[TMUX] Reusing session: ${sessionName}`);
    } catch {
      execSync(`tmux new-session -d -s ${sessionName}`);
      console.log(`[TMUX] Created session: ${sessionName}`);
    }

    console.log("Session Name" + sessionName)

    const ptyProcess: IPty = pty.spawn('tmux', ['attach-session', '-t', sessionName], {
      name: 'xterm-color',
      cols: 120,
      rows: 65,
      cwd: process.env.HOME,
      env: process.env,
    });

    // @ts-expect-error
    ptyProcess.on('data', (data) => {
      console.log("Data out ");
      ws.send(data);
    });

    // @ts-expect-error
    ws.on('message', (msg: WebSocket.RawData) => {

      try {
        console.log("WS MSG: " + msg.toString());
        const data = JSON.parse(msg.toString());

        console.log("WS Data: " + JSON.stringify(data));

        if (data.resize && data.resize.cols && data.resize.rows) {
          ptyProcess.resize(data.resize.cols, 20 );
          console.log(`[${sessionName}] Resizing to cols=${data.resize.cols}, rows=${data.resize.rows}`);
        } else if (data.input) {
          ptyProcess.write(data.input);
        } else {
          console.log(`[${sessionName}] Unhandled message:`, data);
        }

      } catch (err) {
        console.error(`[${sessionName}] Failed to parse message:`, msg.toString());
      }
    });

    // @ts-expect-error
    ws.on('close', () => {
      console.log(`[WS] Client disconnected from session: ${sessionName}`);
      ptyProcess.kill();
    });

  });
}
