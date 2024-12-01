import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills(),   // Enable node polyfills for compatibility
    react(),           // Enable React plugin for JSX support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for your source folder
    },
  },
  base: '/',  // Set base path for production. Change if using a subdirectory.
});
