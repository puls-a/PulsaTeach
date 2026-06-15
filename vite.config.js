import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          supabase: ["@supabase/supabase-js"],
          react: ["react", "react-dom"],
          pedagogy: ["./src/htmlPedagogy.js", "./src/cssPedagogy.js", "./src/jsPedagogy.js"]
        }
      }
    }
  }
});
