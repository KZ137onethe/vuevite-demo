<template>
  <div class="table-parse app-container markdown-container">
    <div v-html="htmlContent" id="markdown-it-table"></div>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it"
import MarkdownItMultimdTable from "markdown-it-multimd-table"

const bodyParams = reactive({})
const bodyParamsElement = new MarkdownIt().use(MarkdownItMultimdTable)
const bodyParamsContent = ref("")
const htmlContent = computed(() => bodyParamsElement.render(bodyParamsContent.value))

async function getParams() {
  return new Promise((resolve, reject) => {
    fetch("/mock/code/body-params", { method: "post" })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function generateTableContent(paramsObject, header) {
  let rowSet = new Set(),
    colSet = new Set()
  for (let key of Object.keys(paramsObject)) {
    rowSet.add(key)
    for (let attrKey of Object.keys(paramsObject[key])) {
      colSet.add(attrKey)
    }
  }
  // 创建一个(rowSet.size + 2) * (colSet.size + 1) 的二维数组, 并初始化
  let content = new Array(rowSet.size)
  for (let i = 0; i < rowSet.size; i++) {
    if (i === 0) {
      content[0] = new Array(colSet.size + 1)
      content[0][0] = header
      for (let j = 0; j < colSet.size; j++) {
        content[0][j + 1] = [...colSet][j]
      }
      // 除首列外，其他列居中
      content[1] = new Array(colSet.size + 1).fill(":------------:")
      content[1][0] = "------------"
    }
    content[i + 2] = new Array(colSet.size + 1)
    content[i + 2][0] = [...rowSet][i]
    for (let k = 0; k < colSet.size; k++) {
      content[i + 2][k + 1] = paramsObject[[...rowSet][i]][[...colSet][k]]
    }
  }

  return content
}

function generateMarkdownTable(content) {
  let markdown = ""

  content.forEach((row) => {
    markdown += "| " + row.join(" | ") + " |\n"
  })

  return markdown
}

function renderProcess() {
  getParams().then((data) => {
    for (let attr of Object.keys(data)) {
      bodyParams[attr] = data[attr]
    }

    let table = generateTableContent(data, "请求参数")
    let markdownTable = generateMarkdownTable(table)
    bodyParamsContent.value = markdownTable
    // bodyParamsContent.value =
    //   "|             |          Grouping           || \n" +
    //   "First Header  | Second Header | Third Header | \n" +
    //   " ------------ | :-----------: | -----------: | \n" +
    //   "Content       |          *Long Cell*        || \n" +
    //   "Content       |   **Cell**    |         Cell | \n" +
    //   "                                               \n" +
    //   "New section   |     More      |         Data | \n" +
    //   "And more      | With an escaped '\\|'       || \n" +
    //   "[Prototype table]                              \n"
  })
}

renderProcess()
</script>

<style lang="scss" scoped></style>
