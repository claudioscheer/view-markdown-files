import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Set the base path for GitHub Pages deployment
  // basename is undefined in dev (use in prod via runtime detection in app)
} satisfies Config;
