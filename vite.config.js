import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://abmyntra-app-api.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      overlay: false
    }
  },
  plugins: [react()],
});
