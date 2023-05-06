<script setup lang="ts">
import MonacoEditor from "monaco-editor-vue3";
import { useStore } from "~/hooks";
const { state } = useStore();
const editor = reactive({
  code: "",
  language: "javascript",
  options: {
    colorDecorators: true,
    lineHeight: 24,
    tooltip: true,
    automaticLayout: true,
    tabSize: 2,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    wordWrapColumn: 80,
    wordWrapMinified: true,
    folding: true,
    foldingStrategy: "indentation",
    renderIndentGuides: true,
    renderLineHighlight: "all",
    renderFinalNewline: true,
    renderWhitespace: "none",
    renderControlCharacters: true,
    autoClosingBrackets: true,
    autoClosingQuotes: true,
    autoClosingOvertype: "always",
    autoSurround: true,
    autoIndent: true,
    dragAndDrop: true,
    useTabStops: true,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: "alt",
    multiCursorPaste: "spread",
    accessibilitySupport: "auto",
    autocorrect: true,
    quickSuggestions: true,
    autocomplete: true,
    tabCompletion: true,
    autoCompletion: true,
    autoClosingDelete: "always",
    formatOnType: true,
    formatOnPaste: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on",
    acceptSuggestionOnCommitCharacter: true,
    selectionClipboard: true,
    hover: true,
    links: true,
    contextmenu: true,
    quickSuggestionsDelay: 3,
    suggestSelection: "recentlyUsed",
    suggestFontSize: 16,
    suggestLineHeight: 16,
    cursorBlinking: "blink",
    cursorSmoothCaretAnimation: true,
    cursorStyle: "line",
    cursorWidth: 2,
    cursorSurroundingLines: 1,
    cursorSurroundingLinesStyle: "default",
    cursorSmartHome: true,
    cursorStickyTab: true,
    lightbulb: {
      enabled: true,
    },
    guides: {
      indent: true,
      brackets: true,
    },
    definitionLinkOpensInPeek: true,
    dropIntoEditor: true,
    gotoLocation: {
      multiple: "goto",
      multipleDefinitions: "goto",
      multipleTypeDefinitions: "goto",
      multipleDeclarations: "goto",
      multipleImplementations: "goto",
      multipleReferences: "goto",
      multipleRenamings: "goto",
    },
    bracketPairColorization: true,
  },
});
const getLanguage = (fileName: string) => {
  const ext = fileName.split(".").pop();
  switch (ext) {
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "py":
      return "python";
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "Pipfile":
      return "pipfile";
    case "yml":
      return "yaml";
    case "yaml":
      return "yaml";
    case "lock":
      return "lock";
    case "vue":
      return "vue";
    default:
      return "javascript";
  }
};

watchEffect(() => {
  if (state.node) {
    const { name, content } = state.node;
    editor.code = content;
    editor.language = getLanguage(name);
  }
});
</script>
<template>
  <Dark style="z-index: 9999" />
  <div class="row h-screen">
    <aside
      class="bg-gray-200 dark:bg-gray-500 w-1/4 p-4 h-full col overflow-y-scroll"
    >
      <div class="col center">
        <Tree />
      </div>
    </aside>
    <div class="col w-3/4 h-full">
      <h1 class="px-2 py-1 w-auto sh">{{ state.node?.name }}</h1>
      <MonacoEditor
        class="w-3/4 h-full"
        :theme="isDark ? 'vs-dark' : 'vs'"
        :options="editor.options"
        :language="editor.language"
        v-model:value="editor.code"
      >
      </MonacoEditor>
    </div>
  </div>
</template>
