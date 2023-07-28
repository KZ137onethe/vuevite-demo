<template>
  <div ref="codeEditorBox" id="codeEditorBox"></div>
</template>

<script setup>
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import * as monaco from "monaco-editor"

const { proxy } = getCurrentInstance()
const emit = defineEmits()
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  width: {
    type: [Number, String],
    default: "100%",
  },
  height: {
    type: [Number, String],
    default: "100%",
  },
  language: {
    type: String,
    default: "JSON",
  },
  theme: {
    type: String,
    validator(value) {
      return ["vs", "hc-black", "vs-dark"].includes(value)
    },
    default: "vs",
  },
  options: {
    type: Object,
    default: () => {
      return {
        automaticLayout: true,
        foldingStrategy: "indentation",
        renderLineHighlight: "all",
        selectOnLineNumbers: true,
        minimap: {
          enabled: false,
        },
        readOnly: false,
        fontSize: 16,
        scrollBeyondLastLine: false,
        overviewRulerBorder: false,
      }
    },
  },
})

let editor

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker()
    }
    if (["css", "scss", "less"].includes(label)) {
      return new cssWorker()
    }
    if (["html", "handlebars", "razor"].includes(label)) {
      return new htmlWorker()
    }
    if (["typescript", "javascript"].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  },
}

function init() {
  nextTick(() => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    })

    !editor
      ? (editor = monaco.editor.create(proxy.$refs.codeEditorBox, {
          value: props.modelValue,
          language: props.language,
          theme: props.theme,
          ...props.options,
        }))
      : editor.setValue("") // 监听值的变化
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue() //给父组件实时返回最新文本
      emit("update:modelValue", value)
      emit("change", value)
    })

    emit("editor-mounted", editor)
  })
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor) {
      const value = editor.getValue()
      if (newValue !== value) {
        editor.setValue(newValue)
      }
    }
  },
)

watch(
  () => props.options,
  (newValue) => {
    editor.updateOptions(newValue)
  },
  { deep: true },
)

watch(
  () => props.language,
  (newValue) => {
    monaco.editor.setModelLanguage(editor.getModel(), newValue)
  },
)

onBeforeUnmount(() => {
  editor.dispose()
})

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
#codeEditorBox {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
