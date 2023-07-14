<template>
  <div class="app-container storage">
    <el-button type="primary" @click="toggleDialog(true)">打开弹框</el-button>
    <el-dialog v-model="visible" title="Tips" width="30%" @close="toggleDialog(false)" draggable>
      <span>It's a draggable Dialog</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button>Cancel</el-button>
          <el-button type="primary">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import localforage from "localforage"

const visible = ref(false)

function toggleDialog(status) {
  localforage.setItem("Dialog", { visible: status })
  visible.value = status
}

function getDialogVisible() {
  localforage.getItem("Dialog").then((res) => {
    visible.value = res?.visible ?? false
  })
}

getDialogVisible()
</script>

<style lang="scss" scoped></style>
