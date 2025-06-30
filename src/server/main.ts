console.log('ENV LOADED:', process.env.SOME_EXPECTED_VAR);

import { BASE } from '../common/constants';
import express from 'express';
import ViteExpress from 'vite-express';
import session from 'express-session';
import { ensureAuthenticated, setupAuthentication } from './authentication';
import ejs from 'ejs';
import * as http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

// TERMINAL
import { setupTmuxWebSocket } from './tmuxSocket';

(async () => {
  try {
    // your actual main code goes here
  } catch (err) {
    console.error('CRASH:', err);
    process.exit(1);
  }
})();



declare module 'express-session' {
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  export interface SessionData {
    // Use this interface to add custom properties to the session
    // csrfToken: string;
    // loginAttempts: number;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PORT = '3000';

const setupMiddleware = (app: express.Application) => {
  app.set('trust proxy', 1); // trust first proxy
  app.set('view engine', 'ejs');
  app.engine('html', (path, data, cb) => {
    ejs.renderFile(path, data, {}, (err, str) => {
      if (err) {
        cb('yoohoo1' + err);
        return undefined;
      }
      cb(null, 'yoohoo2' + str);
    });
  });
  app.set('views', `${__dirname}/pages`);
  app.use(express.static(`${__dirname}/public`));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(session({
    secret: process.env.SESSION_SECRET ?? 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  }));
};

const setupRoutes = (app: express.Application) => {

  // page routes
  app.get('/', ensureAuthenticated, (_, __, next) => {
    next(); // pass to Vite
  });

  // API routes
  app.get('/key', ensureAuthenticated, (_, res) => {
    res.send({ key: process.env.LOCAL_STORAGE_KEY });
  });

  const BASE_DIR = '/gundam_hd_sdb1/STL_1'; // Absolute path

  // FILE BROWSER ROUTES
  app.get('/api/browse', async (req, res) => {
    const subPath = typeof req.query.path === 'string' ? req.query.path : '';
    const targetPath = path.join(BASE_DIR, subPath);

    console.log('subPath: ' + subPath);
    console.log('targetPath: ' + targetPath);

    // Protect from directory traversal
    if (!targetPath.startsWith(BASE_DIR)) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    try {
      const entries = await fs.readdir(targetPath, { withFileTypes: true });
      const listing = entries.map((e) => ({
        name: e.name,
        type: e.isDirectory() ? 'directory' : 'file',
      }));
      res.json({ path: subPath, listing });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read directory' });
    }
  });

  // Download endpoint
  app.get('/api/download', (req, res) => {
    const subPath = typeof req.query.path === 'string' ? req.query.path : '';
    const filePath = path.join(BASE_DIR, subPath);

    if (!filePath.startsWith(BASE_DIR)) {
      return res.status(400).send('Invalid path');
    }
    res.download(filePath);
  });

};

const startServer = () => {
  const app = express();

  setupMiddleware(app);
  setupAuthentication(app);
  setupRoutes(app);

  const server = http.createServer(app);

  // Tmux WebSocket server
  setupTmuxWebSocket(server);

  const port = parseInt(process.env.PORT ?? DEFAULT_PORT, BASE);
  //const displayPort = new Intl.NumberFormat('en-US', {
  //  useGrouping: false,
  //}).format(port);

  ViteExpress.bind(app, server); // ✅ This attaches Vite dev server to your HTTP server.

  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  //ViteExpress.listen(app, port, () => {
    // eslint-disable-next-line no-console
  //  console.log(
  //    `${process.env.NODE_ENV ?? ''} Server is listening on ${displayPort}.`
  //  );
  //});

  // Proxy WebSocket connections
  ViteExpress.config({
    //server: {
    //  proxy: {
    //    '/wss': {
    //      target: 'ws://localhost:3000', // Proxy to your WebSocket server
    //      ws: true,
    //    },
    //  },
    //},
  });

};

startServer(); // Start the server
