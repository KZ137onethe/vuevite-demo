<template>
  <div class="copy-container app-container">
    <el-input id="input" type="text" v-model="value"></el-input>
    <clip-icon v-model:text="value"></clip-icon>
  </div>
</template>

<script setup>
const value = ref("")
</script>

<style lang="scss" scoped>
.el-input {
  width: 500px;
}
</style>
