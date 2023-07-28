<template>
  <el-dialog
    custom-class="code-editor"
    v-model="dialog.visible"
    width="80%"
    :modal="false"
    center
    align-center
    :close-on-click-modal="false"
    @close="init('close')"
  >
    <template #header>
      <span>代码编辑器</span>
      <el-tooltip class="box-item" effect="light" :content="prompt" placement="top-start">
        <svg-icon icon-class="question"></svg-icon>
      </el-tooltip>
    </template>
    <monaco-editor
      v-model="editor.value"
      :language="editor.language"
      height="400px"
    ></monaco-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="saveCode">保存</el-button>
        <el-button type="primary" @click="submitCode">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import MonacoEditor from "@/components/monaco-editor/index.vue"
import { conversionMarkdown } from "./index"

const { proxy } = getCurrentInstance()
const editor = reactive({
  value: "",
  language: "javascript",
  save: false,
})
const prompt = `当前的编程语言是${toRef(editor, "language").value}`

const code = toRef(editor, "value")

const dialog = reactive({
  visible: false,
})

function init(status = "open") {
  if (status === "close") {
    if (editor.save === false) {
      editor.value = ""
    }
    editor.save = false
  }
}

function toggleDialog(status) {
  const initStatus = status ? "open" : "close"
  dialog.visible = status
  init(initStatus)
}

function saveCode() {
  editor.save = true
}

function submitCode() {
  const submitData = conversionMarkdown(code.value, editor.language)
}

defineExpose({ toggleDialog })
</script>

<style lang="scss" scoped></style>
