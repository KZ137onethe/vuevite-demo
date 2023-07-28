<template>
  <el-dialog
    custom-class="on-increase"
    v-model="dialog.visible"
    title="添加文档"
    fullscreen
    modal="false"
    align-center
    destroy-on-close
  >
    <mavon-editor
      v-model="docs.ctx"
      @save="saveDocs"
      :subfield="false"
      :defaultOpen="'editor'"
      navigation
    />
  </el-dialog>
</template>

<script setup>
import { wrap } from "./common"

const dialog = reactive({
  visible: false,
})
const docs = reactive({
  title: "",
  content: "",
  ctx: "",
})

function openDialog() {
  dialog.visible = true
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
  // 网络请求...
}

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
.on-increase {
  .v-note-wrapper {
    min-height: calc(100vh - 124px);
  }
}
</style>
