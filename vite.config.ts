import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
    enabled: true  // 👈 allows service worker in dev mode
  },
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "FitVerse",
        short_name: "FitVerse",
        description: "Your Gym. Your Time. Your Way.",
        theme_color: "#000000",
        background_color: "#ffffff",
         display: "standalone",   // 👈 must be standalone
  orientation: "portrait", // optional, for mobile apps
  scope: "/",              // 👈 must match your app’s base URL
  start_url: "/",    
        icons: [
          {
            src: "fitverse-logo.png",
            sizes: "192x192",
            type: "image/png"
          },
         
        ]
      }
    })
,
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
