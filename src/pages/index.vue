<template>
  <div class="app-container home">
    <header><b>测试</b></header>
    <div class="route-test">
      <router-link to="/docs">去使用下mavon-editor来编辑markdown</router-link>
      <router-link to="/storage">去使用下storage来存数据</router-link>
      <router-link to="/lifeCycle">去感受下Vue的生命周期</router-link>
      <router-link to="/copy">去使用clipboard的复制快感</router-link>
      <router-link to="/crypto">去使用crypto的加密库</router-link>
      <router-link to="/markdown-it">去解析markdownIt编辑器</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.route-test {
  a {
    padding: 10px;
  }
}
</style>
