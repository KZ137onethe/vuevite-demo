import { createRouter, createWebHashHistory } from "vue-router"

// 路由
const route = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/docs",
    component: () => import("@/pages/docs/index.vue"),
  },
  {
    path: "/storage",
    component: () => import("@/pages/storage/index.vue"),
  },
  {
    path: "/lifeCycle",
    component: () => import("@/pages/lifeCycle/index.vue"),
  },
  {
    path: "/copy",
    component: () => import("@/pages/copy/index.vue"),
  },
  {
    path: "/crypto",
    component: () => import("@/pages/crypto/index.vue"),
  },
  {
    path: "/markdown-it",
    component: () => import("@/pages/markdownIt/index.vue"),
  },
  {
    path: "/markdown-it/code-highlight",
    component: () => import("@/pages/markdownIt/code-highlight.vue"),
  },
  {
    path: "/markdown-it/table-parse",
    component: () => import("@/pages/markdownIt/table-parse.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: route,
})

export default router
