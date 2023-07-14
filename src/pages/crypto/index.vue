<template>
  <div class="crypto app-container">
    <header style="text-indent: 1rem">加密</header>
    <el-input type="text" v-model="data.ResidentID" placeholder="请输入身份证号"></el-input>
    <el-button type="primary" @click="MD5Encryption">MD5加密</el-button>
    <el-input type="text" v-model="data.encryptionCode" placeholder="加密密码"></el-input>
  </div>
</template>

<script setup>
import CryptoJS from "crypto-js"

const data = reactive({
  ResidentID: "430423200102165811",
  encryptionCode: "",
})

function MD5Encryption(date = Date.now()) {
  data.encryptionCode = CryptoJS.MD5(data.ResidentID + date)
}
</script>

<style lang="scss" scoped>
.el-input {
  display: flex;
  width: 400px;
}
</style>
