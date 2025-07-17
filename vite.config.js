import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // IMPORTANTE para deploy en subcarpetas o Netlify
  plugins: [react()],
});
