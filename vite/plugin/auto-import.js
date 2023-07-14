import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

export default function AutoImportPlugins() {
  let autoImports = []
  // 自动按需导入 Element Plus
  autoImports.push([
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ])
  // 自动导入api
  autoImports.push(
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: false,
    }),
  )
  return autoImports
}
