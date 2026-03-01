import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import type { Plugin } from 'vite';

// Dev-only API middleware to avoid 404 on /api/analyze during Vite dev
const devApiPlugin = (): Plugin => ({
  name: 'linksnap-dev-api',
  apply: 'serve',
  configureServer(server) {
    const { middlewares } = server;
    middlewares.use('/api/analyze', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Allow', 'POST');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      try {
        const chunks: Uint8Array[] = [];
        req.on('data', (c) => chunks.push(Buffer.from(c)));
        await new Promise<void>((resolve) => req.on('end', () => resolve()));
        const bodyText = Buffer.concat(chunks).toString('utf8') || '{}';
        const body = JSON.parse(bodyText);

        const sanitizeText = (value?: string, maxLen = 2000) => {
          if (!value) return '';
          const cleaned = value
            .replace(/<[^>]*>/g, '')
            .replace(/[\u0000-\u001F\u007F]/g, '')
            .trim();
          return cleaned.slice(0, maxLen);
        };

        const sanitizeUrl = (value?: string): string | null => {
          const cleaned = sanitizeText(value, 2048);
          if (!cleaned) return null;
          try {
            const u = new URL(cleaned);
            if (!['http:', 'https:'].includes(u.protocol)) return null;
            return u.toString();
          } catch {
            return null;
          }
        };

        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const { base64Data, url, model = 'gemini-2.5-flash', apiKey } = body || {};

        if (!apiKey || typeof apiKey !== 'string' || apiKey.length < 20 || !apiKey.startsWith('AI')) {
          res.statusCode = 401;
          res.end(JSON.stringify({ error: 'API key required' }));
          return;
        }

        const safeUrl = sanitizeUrl(url || undefined);
        if (!base64Data && !safeUrl) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'base64Data or url required' }));
          return;
        }

        const systemInstruction = `Identify software tools, web apps, and digital products.\nExtract: tool name, official URL, category, description, pricing, and platform.\nUse Google Search to verify details. Keep response concise.`;
        const userPrompt = safeUrl
          ? `Analyze URL: ${safeUrl}. Extract: name, category, description, pricing, platforms.`
          : 'Identify this product from image. Extract: name, category, description, pricing, platforms.';

        const genAI = new GoogleGenerativeAI(apiKey);
        const geminiModel = genAI.getGenerativeModel({
          model,
          systemInstruction,
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                url: { type: 'STRING' },
                category: { type: 'STRING' },
                suggestedCategories: { type: 'ARRAY', items: { type: 'STRING' } },
                subCategory: { type: 'STRING' },
                description: { type: 'STRING' },
                pricing: { type: 'STRING' },
                platform: { type: 'STRING' },
              },
              required: ['url', 'category', 'description', 'pricing', 'platform'],
            },
          },
        });

        const content: any[] = [{ text: userPrompt }];
        if (base64Data) {
          const safeImage = sanitizeText(base64Data, 1_000_000);
          content.push({
            inlineData: {
              mimeType: 'image/png',
              data: safeImage.includes(',') ? safeImage.split(',')[1] : safeImage,
            },
          });
        }

        const response = await geminiModel.generateContent(content);
        const resultText = response.response.text();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(resultText);
      } catch (err: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err?.message || 'Analysis failed' }));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', 'VITE_');
    return {
      server: {
        port: 5173,
        host: '0.0.0.0',
      },
      plugins: [
        react(), 
        devApiPlugin(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['logo.png', 'linksnap-logo.png'],
          manifest: {
            name: 'LinkSnap AI Registry',
            short_name: 'LinkSnap',
            description: 'AI-powered screenshot and link archivist.',
            theme_color: '#000000',
            background_color: '#000000',
            display: 'standalone',
            scope: '/',
            start_url: '/',
            orientation: 'portrait-primary',
            icons: [
              {
                src: '/linksnap-logo.png',
                sizes: '192x192 512x512',
                type: 'image/png',
                purpose: 'any',
              },
              {
                src: '/linksnap-logo.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
              },
            ],
          },
          workbox: {
            navigateFallback: '/index.html',
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf}'],
            globIgnores: ['**/node_modules/**/*', '**/sw.js'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/api\..*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'api-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                  },
                },
              },
              {
                urlPattern: /^https:\/\/.+\.(png|jpg|jpeg|webp|gif|svg|ico|font|woff2?)$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'image-cache',
                  expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  },
                },
              },
            ],
          },
          devOptions: {
            enabled: false, // Disable in dev to use custom sw.js
          },
        }),
      ],
      build: {
        target: 'esnext',
        minify: 'terser',
        rollupOptions: {
          output: {
            manualChunks: undefined, // Let Vite handle code splitting
          },
        },
      },
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
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'lucide-react', '@google/generative-ai', 'jspdf', 'jspdf-autotable'],
      },
    };
});
