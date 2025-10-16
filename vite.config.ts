import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/view-markdown-files" : "/view-markdown-files/",
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
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
}));
