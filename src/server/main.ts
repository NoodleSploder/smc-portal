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
import * as fs from 'fs/promises';
import type { Request, Response } from 'express';

// TERMINAL
import { setupTmuxWebSocket } from './tmuxSocket';

// ARCHIVE BROWSING
//import Seven from 'node-7z';
//import sevenBin from '7zip-bin'
const Seven = require('node-7z');
//import extractFull from 'node-7z';

//import { ParsedQs } from 'qs';

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

  // Compressed File Browser
  app.get('/api/browse-archive', async (req: Request, res: Response) => {
    const { archive, path: subPath } = req.query;
    if (!archive || typeof archive !== 'string') {
      return res.status(400).json({ listing: [], error: 'Missing archive parameter' });
    }
    const archiveFile = decodeURIComponent(archive);
    const archivePath = path.normalize(path.join(BASE_DIR, archiveFile));
    const ext = archive.split('.').pop()?.toLowerCase() || '';
    const sub = typeof subPath === 'string' ? subPath : '';
    try {
      if (ext === 'zip' || ext === '7z' || ext === 'rar') {
        const files: { name: string; type: string }[] = [];
        const stream = Seven.list(archivePath);

        stream.on('data', (entry: any) => {
          if (entry.file) {
            const entryFile = entry.file as string;
            if (entryFile.startsWith(sub)) {
              const name = entryFile.slice(sub.length);
              if (name.length > 0) {
                files.push({
                  name,
                  type: name.includes('/') ? 'directory' : 'file',
                });
              }
            }
          }
        });
        stream.on('end', () => {
          return res.json({ listing: files });
        });
        stream.on('error', (err: Error) => {
          console.error(err);
          return res.status(500).json({ listing: [], error: 'Failed to read 7z archive' });
        });
        return; // prevent falling through
      }
      return res.status(400).json({ listing: [], error: `Unsupported archive type: ${ext}` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ listing: [], error: 'Error reading archive' });
    }
  });

  // Download endpoint
  app.get('/api/download_backup_v1', (req, res) => {
    const subPath = typeof req.query.path === 'string' ? req.query.path : '';
    const filePath = path.join(BASE_DIR, subPath);

    if (!filePath.startsWith(BASE_DIR)) {
      return res.status(400).send('Invalid path');
    }
    res.download(filePath);
  });

  // Download Endpoint
  app.get('/api/download', async (req, res) => {
    const { archive, path: entryPath } = req.query;

    if (typeof archive !== 'string' || typeof entryPath !== 'string') {
      return res.status(400).send('Missing or invalid archive/path');
    }

    const ext = archive.split('.').pop()?.toLowerCase();
    const archivePath = path.resolve(archive);

    if (ext === 'zip' || ext === '7z' || ext === 'rar') {
      const tempOut = `/tmp/extract-${Date.now()}`;
      const extractor = Seven.extractFull(
        archivePath,
        tempOut,
        {
          $progress: true,
          recursive: true,
          $cherryPick: [entryPath],
        }
      );

      extractor.on('end', () => {
        const filePath = path.join(tempOut, entryPath);
        res.sendFile(filePath, err => {
          if (err) {
            console.error(err);
            res.status(500).send('Failed to send extracted file');
          }
        });
      });

      extractor.on('error', (err: any) => {
        console.error(err);
        res.status(500).send('Failed to extract file');
      });

      return;
    }

    // Fallback for plain files
    const filePath = path.resolve(BASE_DIR, entryPath);
    res.sendFile(filePath);
  });



  // File: inline preview
  app.get('/api/file', (req, res) => {
    const subPath = typeof req.query.path === 'string' ? req.query.path : '';
    const filePath = path.join(BASE_DIR, subPath);

    if (!filePath.startsWith(BASE_DIR)) {
      return res.status(400).send('Invalid path');
    }

    res.sendFile(filePath); // Browser handles PDF/image inline
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

  ViteExpress.bind(app, server); // ✅ This attaches Vite dev server to your HTTP server.

  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  // Proxy WebSocket connections
  ViteExpress.config({
  });

};

startServer(); // Start the server


            /*

      import AdmZip from 'adm-zip';

      if (ext === 'zip') {
        const zip = new AdmZip(archivePath);
        const entries = zip.getEntries();

        const listing = entries
          .filter((e) => e.entryName.startsWith(sub) && e.entryName !== sub)
          .map((e) => {
            const rest = e.entryName.slice(sub.length).replace(/^\/+/, '');
            const parts = rest.split('/');
            return {
              name: parts[0],
              type: parts.length > 1 || e.isDirectory ? 'directory' : 'file'
            };
          })
          .filter(
            (v, i, a) => a.findIndex((t) => t.name === v.name && t.type === t.type) === i
          );

        res.json({ listing });
      }
      */
