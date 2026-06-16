import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@supabase/supabase-js")) return "supabase";
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react";
          if (id.includes("htmlPedagogy.js") || id.includes("cssPedagogy.js") || id.includes("jsPedagogy.js")) return "pedagogy";
          return undefined;
        }
      }
    }
  }
});
