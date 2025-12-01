import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-dev-overlay";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  root: "client",
  base: "/Hero.little/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
});
