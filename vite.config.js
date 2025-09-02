import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Vercel expects the build output here
  },
  server: {
    port: 5173, // local dev port
    host: true, // allows network access in local dev
  },
});
