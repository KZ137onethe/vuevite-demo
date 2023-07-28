<template>
  <el-dialog
    custom-class="on-editor"
    v-model="dialog.visible"
    title="编辑文档"
    fullscreen
    modal="false"
    center
    align-center
    destroy-on-close
  >
    <mavon-editor v-model="docs.ctx" @save="saveDocs" />
  </el-dialog>
</template>

<script setup>
import { wrap } from "./common"

const props = defineProps({
  ctx: {
    type: Object,
    default: { title: "", content: "" },
  },
})
const emits = defineEmits()

const dialog = reactive({
  visible: false,
})
const docs = reactive({
  title: "",
  content: "",
  ctx: "",
})

function init() {
  docs.title = props.ctx.title
  docs.content = props.ctx.content
  docs.ctx = docs.title + wrap + docs.content
}

function openDialog() {
  dialog.visible = true
  init()
}

function saveDocs() {
  // 数据处理
  const data = docs.ctx.split("\n")
  docs.title = data[0]
  docs.content = ""
  if (data.length > 1) {
    const content = data.slice(1, data.length)
    docs.content = content.join(wrap)
  }
  emits("update:data", docs)
}

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
.on-editor {
  .v-note-wrapper {
    min-height: calc(100vh - 124px);
  }
}
</style>
