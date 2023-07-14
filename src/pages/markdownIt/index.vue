<template>
  <div class="markdown-it app-container">
    <el-table :data="markdownData" stripe style="width: 100%">
      <el-table-column label="Name" width="250">
        <template #default="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Link">
        <template #default="scope">
          <el-button type="plain" link>
            <router-link :to="path + scope.row.link" class="code-link">
              {{ scope.row.description }}
            </router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const route = useRoute()

const path = route.path
const markdownData = [
  {
    name: "代码高亮",
    link: "/code-highlight",
    description: "使用markdown-it和highlight.js实现",
  },
  {
    name: "解析表格",
    link: "/table-parse",
    description: "使用markdown-it和markdown-it-multimd-table实现",
  },
]

console.log("route: ", route)
</script>

<style lang="scss" scoped></style>
