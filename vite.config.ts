import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠ 重要：base 一定要是 /Hero.little/
// 這樣 GitHub Pages 在子路徑下才會正確載入 JS / CSS 檔
export default defineConfig({
  base: "/Hero.little/",
  plugins: [react()],
});
