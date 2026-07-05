import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: false,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/package/index.jsx"),
      name: "ResuAveTextEditor",
      formats: ["es", "cjs"],
      fileName: (format) => {
        if (format === "es") return "index.js";
        if (format === "cjs") return "index.cjs";
        return `index.${format}.js`;
      },
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@tiptap/react",
        "@tiptap/pm",
        "@tiptap/starter-kit",
        "@tiptap/extension-list",
        "@tiptap/extension-text-align",
        "@tiptap/extension-text-style",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "style.css";
          }

          return "assets/[name][extname]";
        },
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
