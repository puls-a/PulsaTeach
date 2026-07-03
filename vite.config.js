import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:4174"
    }
  },
  preview: {
    proxy: {
      "/api": "http://127.0.0.1:4174"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@supabase/supabase-js")) return "supabase";
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react";
          if (id.includes("htmlPedagogy.js") || id.includes("cssPedagogy.js") || id.includes("jsPedagogy.js")) return "pedagogy";
          if (id.includes("/src/content/html") || id.includes("\\src\\content\\html")) return "content-html";
          if (id.includes("/src/content/css") || id.includes("\\src\\content\\css")) return "content-css";
          if (id.includes("/src/content/javascript") || id.includes("\\src\\content\\javascript") || id.includes("/src/content/jsBuilders") || id.includes("\\src\\content\\jsBuilders")) return "content-js";
          if (id.includes("trackBuilders") || id.includes("lessonMetadata") || id.includes("moduleMetadata")) return "content-meta";
          if (id.includes("/src/content/tracks/accessibility") || id.includes("\\src\\content\\tracks\\accessibility")) return "content-a11y-track";
          if (id.includes("/src/content/tracks/git") || id.includes("\\src\\content\\tracks\\git")) return "content-git-track";
          if (id.includes("/src/content/tracks/testing") || id.includes("\\src\\content\\tracks\\testing")) return "content-testing-track";
          if (id.includes("/src/content/tracks/typescript") || id.includes("\\src\\content\\tracks\\typescript")) return "content-typescript-track";
          if (id.includes("/src/content/tracks/react") || id.includes("\\src\\content\\tracks\\react")) return "content-react-track";
          if (id.includes("/src/content/tracks/node-api") || id.includes("\\src\\content\\tracks\\node-api")) return "content-node-track";
          if (id.includes("/src/content/tracks/sql-postgresql") || id.includes("\\src\\content\\tracks\\sql-postgresql")) return "content-sql-track";
          if (id.includes("/src/content/tracks/web-security") || id.includes("\\src\\content\\tracks\\web-security")) return "content-security-track";
          if (id.includes("/src/content/tracks/web-performance") || id.includes("\\src\\content\\tracks\\web-performance")) return "content-performance-track";
          if (id.includes("/src/content/tracks/devops-deployment") || id.includes("\\src\\content\\tracks\\devops-deployment")) return "content-devops-track";
          return undefined;
        }
      }
    }
  }
});
