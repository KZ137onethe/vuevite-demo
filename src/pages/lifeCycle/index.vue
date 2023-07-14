<template>
  <div class="app-container lift-cycle">
    <header><b>生命周期测试</b></header>
    <div>
      <el-input placeholder="请输入" v-model="value" />
      <br />
      <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"

const value = ref("")
const form = reactive({
  age: "21",
  name: "杰克",
  school: "清华大学",
})

onUpdated(() => {
  ElMessage({
    message: "已更新",
    type: "success",
  })
})

onMounted(() => {
  ElMessage({
    message: "组件已挂载",
    type: "success",
  })
})
</script>

<style lang="scss" scoped>
.el-input {
  margin: 5px auto;
  width: 400px;
}
</style>
