import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 給 GitHub Pages 用的設定
export default defineConfig({
  // 專案真正的前端程式在 client/ 底下
  root: 'client',
  // 你的 GitHub Pages 路徑：https://luckygbear-coder.github.io/Hero.little/
  base: '/Hero.little/',
  plugins: [react()],
  build: {
    // 輸出到 repo 根目錄的 dist 資料夾，讓 workflow 可以找到
    outDir: '../dist',
    emptyOutDir: true,
  },
})
