import Vue from "@vitejs/plugin-vue"
import AutoImportPlugins from "./auto-import"

export default function createVitePlugins() {
  const vitePlugins = [Vue()]
  vitePlugins.push(AutoImportPlugins())
  return vitePlugins.flat()
}
