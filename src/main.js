import "./assets/styles/index.scss" // 导入 global 样式

import { createApp } from "vue"
import App from "./App.vue"

import MavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"

// icon
import elementIcon from "./components/SvgIcon/svgicon"
import "virtual:svg-icons-register" // 插件注册脚本
import SvgIcon from "./components/SvgIcon/index.vue"

// 全局组件
import ClipIcon from "./components/clip-icon/index.vue"

import router from "./router"

const app = createApp(App)

// 全局组件挂载
app.component("ClipIcon", ClipIcon)
app.component("svg-icon", SvgIcon)

app.use(router)
app.use(elementIcon)
app.use(MavonEditor)
app.mount("#app")
