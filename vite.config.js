import { defineConfig } from "vite"
import createVitePlugins from "./vite/plugin"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  resolve: {
    alias: {
      // 设置路径
      "~": path.resolve(__dirname, "./"),
      // 设置别名
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    port: 5173,
    proxy: {
      "/mock": {
        target: "https://www.fastmock.site/mock/f747ab712ae3799d06ef02afb437bc50/mock",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, ""),
      },
    },
  },
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`,
    ],
  },
})
