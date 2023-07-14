<template>
  <div class="code-highlight app-container markdown-container">
    <el-input type="textarea" v-model="codeTextarea" cols="30" rows="5"></el-input>
    <div id="code-wrapper">
      <clip-icon v-model:text="code" class="copy-icon"></clip-icon>
      <div v-html="codeContent" id="markdown-it-code"></div>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

/**
 * 功能点:
 * 1.代码高亮
 * 2.行号
 * 3.一键复制
 */
const code = ref("")
const codeElement = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    code.value = str
    console.log("str->", str)
    if (lang && hljs.getLanguage(lang)) {
      try {
        let highlightedHtml = hljs.highlight(str, { language: lang }).value

        // 生成行号
        let lineNum = highlightedHtml.split("\n").length - 1
        let lineNumbersRowsStart = `<span aria-hidden="true" class="line-numbers-rows">`
        let lineNumbersRowsEnd = `</span>`
        for (let i = 0; i < lineNum; i++) {
          lineNumbersRowsStart += `<span></span>`
        }
        const lineNumbersRows = lineNumbersRowsStart + lineNumbersRowsEnd

        let languageName = `<b class="language-name">${lang}</b>`

        /* 如果返回的不含pre code标签，它会自己加上；如果返回的含有pre code标签，它就不加了 */
        return `<pre><code class="language-${lang} hljs">${highlightedHtml}</code>${lineNumbersRows}${languageName}</pre>`
      } catch (__) {}
    }
  },
})
const codeTextarea = ref("")
const codeContent = computed(() => codeElement.render(codeTextarea.value))

async function getCode() {
  return new Promise((resolve, reject) => {
    fetch("/mock/code/example")
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res.data)
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

async function renderProcess() {
  getCode().then((data) => {
    codeTextarea.value = data
  })
  await nextTick()
}

renderProcess()
</script>

<style lang="scss" scoped>
.code-highlight {
  #code-wrapper .copy-icon {
    float: right;
    position: relative;
    z-index: 100;
    margin-top: 0.4rem;
    margin-right: 1rem;
  }
}
</style>
