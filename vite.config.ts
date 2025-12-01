import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // 這裡一定要是你的 repo 名稱，前後都要有斜線
  base: "/Hero.little/",
  plugins: [react()],
});
