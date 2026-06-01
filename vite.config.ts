import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Pure client-rendered SPA: no per-request SSR. The build prerenders a
    // single static shell that hydrates and handles every route client-side,
    // so the output can be served from any static host.
    spa: {
      enabled: true,
      // Emit the shell as index.html so static hosts serve it as the default
      // document for "/" with no extra config.
      prerender: { outputPath: "/index.html" },
    },
  },
  // No Nitro server: produce a plain static Vite build (in `dist/client`) that
  // can be deployed to any static hosting provider. Inside Lovable the build
  // pipeline is managed separately.
  nitro: false,
});
