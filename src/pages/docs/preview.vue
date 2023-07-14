<template>
  <el-dialog
    custom-class="on-preview"
    v-model="dialog.visible"
    title="预览文档"
    center
    align-center
    destroy-on-close
  >
    <mavon-editor
      v-model="ctx"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :boxShadow="false"
      placeholder="空"
    ></mavon-editor>
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

const dialog = reactive({
  visible: false,
})
const docs = reactive({
  title: "",
  content: "",
})
const ctx = computed(() => docs.title + wrap + docs.content)

function openDialog() {
  dialog.visible = true
  docs.title = props.ctx.title
  docs.content = props.ctx.content
}

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped></style>
