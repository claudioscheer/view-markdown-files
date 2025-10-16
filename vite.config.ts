import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/view-markdown-files/' : '/',
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ['**/*'], // Cache all static assets from public folder
      manifest: false, // We'll use the public/manifest.json instead
      workbox: {
        globPatterns: ['**/*'], // Cache all files in the build output
        navigateFallback: command === 'build' ? '/view-markdown-files/index.html' : '/index.html', // Service worker needs absolute paths
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/], // Don't use fallback for API calls or files with extensions
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              const basePath = command === 'build' ? '/view-markdown-files' : '';
              return url.pathname.startsWith(basePath);
            },
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
}));
