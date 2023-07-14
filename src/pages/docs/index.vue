<template>
  <div class="app-container docs">
    <el-button type="success" @click="createDocs()">新增文档</el-button>
    <ul class="docs-list">
      <li class="docs-li"></li>
    </ul>
    <el-button type="info" @click="editorDocs()">编辑文档</el-button>
    <el-button type="primary" @click="viewDocs()">预览文档</el-button>
  </div>
  <on-increase ref="onIncrease" />
  <on-preview ref="onPreview" :ctx="docs"></on-preview>
  <on-editor ref="onEditor" :ctx="docs" @update:data="saveDocs"></on-editor>
</template>

<script setup>
import { reactive, ref, nextTick } from "vue"
import OnIncrease from "./increase.vue"
import OnEditor from "./editor.vue"
import OnPreview from "./preview.vue"

const onIncrease = ref(null)
const onEditor = ref(null)
const onPreview = ref(null)
const docs = reactive({
  title: "",
  content: "",
})

function createDocs() {
  nextTick(() => {
    onIncrease.value.openDialog()
  })
}

function editorDocs() {
  nextTick(() => {
    onEditor.value.openDialog()
  })
}

function viewDocs() {
  nextTick(() => {
    onPreview.value.openDialog()
  })
}

function saveDocs(data) {
  const { title, content } = data
  docs.title = title
  docs.content = content
  // 发送网络请求
}
</script>

<style lang="scss" scoped></style>
