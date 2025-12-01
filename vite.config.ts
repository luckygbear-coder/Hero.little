import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-dev-overlay";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

// ⚠️ 這份設定的重點：把 Vite 的根目錄指到「client」
export default defineConfig({
  // 1. 告訴 Vite：前端程式碼都在 client/ 裡
  root: "client",

  // 2. GitHub Pages 的 base 路徑（= 你的 repo 名稱）
  base: "/Hero.little/",

  // 3. build 出來的資料夾
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  // 4. 啟用的外掛（跟 Replit 模板相容）
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
  ],

  // 5. 路徑別名（可以用 @ 代表 client/src）
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
});
