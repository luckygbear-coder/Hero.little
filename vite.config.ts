import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// 這份設定會讓 Vite 以「client 資料夾」當專案根目錄
// index.html & src 都在 client 裡

export default defineConfig({
  // 專案根目錄在 client
  root: 'client',

  // GitHub Pages 的路徑（你的網址是 /Hero.little/）
  base: '/Hero.little/',

  // build 出來的東西放到專案根目錄的 dist/
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },

  plugins: [react()],
})
