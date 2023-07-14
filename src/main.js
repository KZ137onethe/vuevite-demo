import "./assets/styles/index.scss" // 导入 global 样式

import { createApp } from "vue"
import App from "./App.vue"

import MavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"

// icon
import elementIcon from "./components/SvgIcon/svgicon"

// 全局组件
import ClipIcon from "./components/clip-icon/index.vue"

import router from "./router"

const app = createApp(App)

// 全局组件挂载
app.component("ClipIcon", ClipIcon)

app.use(router)
app.use(elementIcon)
app.use(MavonEditor)
app.mount("#app")
