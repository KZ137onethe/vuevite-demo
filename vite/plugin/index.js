import Vue from "@vitejs/plugin-vue"
import AutoImportPlugins from "./auto-import"
import createSvgIcon from "./svg-icon"

export default function createVitePlugins() {
  const vitePlugins = [Vue()]
  vitePlugins.push(AutoImportPlugins())
  vitePlugins.push(createSvgIcon())
  return vitePlugins.flat()
}
