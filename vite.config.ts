import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', 'VITE_');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // SECURITY: API keys should NOT be exposed in client-side code
      // Use environment variables on the server side instead
      define: {
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || null),
        'import.meta.env.VITE_API_ENDPOINT': JSON.stringify(env.VITE_API_ENDPOINT || null),
        'import.meta.env.VITE_ENABLE_LOCAL_STORAGE': JSON.stringify(env.VITE_ENABLE_LOCAL_STORAGE !== 'false'),
        'import.meta.env.VITE_ENABLE_BACKUP': JSON.stringify(env.VITE_ENABLE_BACKUP !== 'false'),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
