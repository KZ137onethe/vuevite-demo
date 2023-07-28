<template>
  <div class="app-container docs">
    <el-table :data="editorData" border stripe>
      <el-table-column label="name" prop="name" width="250" />
      <el-table-column label="content">
        <template #default="scope">
          <el-button
            v-for="option of scope.row.content"
            :key="option.name"
            :type="option.type"
            @click="option.setting()"
          >
            {{ option.name }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <on-increase ref="onIncrease" />
  <on-preview ref="onPreview" :ctx="docs"></on-preview>
  <on-editor ref="onEditor" :ctx="docs" @update:data="saveDocs"></on-editor>
  <code-editor ref="codeEditor"></code-editor>
</template>

<script setup>
import OnIncrease from "./basic/increase.vue"
import OnEditor from "./basic/editor.vue"
import OnPreview from "./basic/preview.vue"
import CodeEditor from "./code/editor.vue"

const { proxy } = getCurrentInstance()
const docs = reactive({
  title: "",
  content: "",
})
const editorData = [
  {
    name: "基础操作",
    content: [
      {
        name: "新增文档",
        type: "success",
        setting: createDocs,
      },
      {
        name: "编辑文档",
        type: "info",
        setting: editorDocs,
      },
      {
        name: "预览文档",
        type: "primary",
        setting: viewDocs,
      },
    ],
  },
  {
    name: "markdown代码块编辑",
    content: [
      {
        name: "代码编辑",
        type: "success",
        setting: editorCode,
      },
    ],
  },
]
function createDocs() {
  nextTick(() => {
    proxy.$refs.onIncrease.openDialog()
  })
}

function editorDocs() {
  nextTick(() => {
    proxy.$refs.onEditor.openDialog()
  })
}

function viewDocs() {
  nextTick(() => {
    proxy.$refs.onPreview.openDialog()
  })
}

function editorCode() {
  nextTick(() => {
    proxy.$refs.codeEditor.toggleDialog(true)
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
