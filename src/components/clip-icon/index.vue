<template>
  <div class="component-copy">
    <el-button id="copy" type="plain" :data-clipboard-text="text" link>
      <el-icon title="复制失败" v-if="copy.error" color="red"><CloseBold /></el-icon>
      <el-icon title="复制成功" v-else-if="copy.status" color="green"><Select /></el-icon>
      <el-icon title="复制" v-else><DocumentCopy /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
import Clipboard from "clipboard"

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  animation: {
    type: Boolean,
    default: false,
  },
})

const copy = reactive({
  status: false,
  error: false,
})
const clipboard = new Clipboard("#copy")

function handleProgress() {
  clipboard.on("success", (e) => {
    copy.status = true
  })

  clipboard.on("error", (e) => {
    copy.error = true
    console.log("error: ", e)
  })
}

handleProgress()
onUnmounted(() => {
  clipboard.destroy()
})
</script>

<style lang="scss" scoped>
.component-copy {
  display: inline-block;
}
</style>
