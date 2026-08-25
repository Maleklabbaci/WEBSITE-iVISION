import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, '.'),
    },
  },
});

// La clé Gemini reste exclusivement côté serveur. Elle ne doit jamais être
// injectée via `define`, car tout ce qui est défini ici devient public dans le bundle.
