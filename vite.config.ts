import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/view-markdown-files" : "/view-markdown-files/",
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
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
        navigateFallback: '/view-markdown-files/index.html', // Service worker needs absolute paths for GitHub Pages
        navigateFallbackDenylist: [], // Cache everything - no deny list
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Add version to cache name to force cache invalidation
        cacheId: `markdown-viewer-v${process.env.npm_package_version}`,
        // Force immediate update when new version is available
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/claudioscheer\.github\.io\/view-markdown-files\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
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
