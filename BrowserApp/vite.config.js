import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../backend/dist", 
  },
  plugins: [react()],
  server: {
    hmr: true,
    port: 5173,
  },
});
