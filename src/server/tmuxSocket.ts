//import { spawn, execSync } from 'node:child_process';
import { WebSocketServer, WebSocket } from 'ws';
import { parse } from 'url';
import http from 'http';
import { spawn } from 'node-pty';
import { execSync } from 'child_process';


const sessionName = 'webterm';

function checkOrCreateTmuxSession() {
  try {
    execSync(`tmux has-session -t ${sessionName}`);
    console.log(`[TMUX] Reusing existing session: ${sessionName}`);
  } catch {
    execSync(`tmux new-session -d -s ${sessionName}`);
    console.log(`[TMUX] Created new session: ${sessionName}`);
  }
}

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

  wss.on('connection', (ws, query) => {
    const sessionName = query?.session as string || 'default';
    try {
      execSync(`tmux has-session -t ${sessionName}`);
      console.log(`[TMUX] Reusing session: ${sessionName}`);
    } catch {
      execSync(`tmux new-session -d -s ${sessionName}`);
      console.log(`[TMUX] Created session: ${sessionName}`);
    }

    const shell = spawn('tmux', ['attach-session', '-t', sessionName], {
      name: 'xterm-color',
      cols: 160,
      rows: 48,
      cwd: process.env.HOME,
      env: process.env,
    });

    console.log(`[PTY] Attached to session: ${sessionName}`);

    shell.on('data', (data) => {
      ws.send(data);
    });

    ws.on('message', (msg) => {
      try {
        console.log("WS MSG: " + msg.toString());
        const data = JSON.parse(msg.toString());

        console.log("WS Data: " + JSON.stringify(data));

        if (data.resize && data.resize.cols && data.resize.rows) {
          shell.resize(data.resize.cols, data.resize.rows);
          console.log(`[${sessionName}] Resizing to cols=${data.resize.cols}, rows=${data.resize.rows}`);
        } else if (data.input) {
          shell.write(data.input);
        } else {
          console.log(`[${sessionName}] Unhandled message:`, data);
        }
      } catch (err) {
        console.error(`[${sessionName}] Failed to parse message:`, msg.toString());
      }
    });

    ws.on('close', () => {
      console.log(`[WS] Client disconnected from session: ${sessionName}`);
      shell.kill();
    });
  });
}
