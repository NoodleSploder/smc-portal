import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    //origin: 'http://192.168.4.24:5173',
    cors: true,
    allowedHosts : [
      'www.somanychickens.com'
    ]
  },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
});
