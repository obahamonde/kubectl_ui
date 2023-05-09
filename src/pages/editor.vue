<script setup lang="ts">
import MonacoEditor from "monaco-editor-vue3";
import { useStore } from "~/hooks";
const { state } = useStore();

const diff = ref<string>("");

const showingDiff = ref(false);

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

const compareTree = async () => {
  const thisTree = state.node;
  const { data } = await useFetch(`/api/deploy`, {
    method: "PUT",
    body: JSON.stringify({
      user: state.user?.ref,
      owner: state.remote.owner,
      name: state.remote.repo,
      tree: thisTree,
    }),
  }).json();
  const { url } = unref(data);
  diff.value = url;
  showingDiff.value = true;
};
const editor = reactive({
  code: "",
  language: getLanguage(state.node ? state.node.name : "app.py"),
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

watchEffect(() => {
  if (diff.value) {
    showingDiff.value = true;
  }
});
</script>
<template>
  <Dark style="z-index: 9999" />
  <div class="row h-screen">
    <a
      :href="diff"
      target="_blank"
      style="z-index: 9999"
      class="bl fixed m-4 text-2xl text-cyan font-bold scale c p"
      v-if="showingDiff"
      >{{ diff }}</a
    >
    <FileTree />
    <Icon
      icon="logos:branch-icon"
      class="x3 m-4 mt-8 cp scale fixed tl"
      style="z-index: 9999"
      @click="compareTree"
    />
    <div class="col w-3/4 h-full">
      <h1 class="px-2 py-1 w-auto sh">
        {{ state.node ? state.node.name : "app.py" }}
      </h1>
      <MonacoEditor
        v-if="state.currentNode"
        class="w-3/4 h-full"
        :theme="isDark ? 'vs-dark' : 'vs'"
        :options="editor.options"
        :language="editor.language"
        v-model:value="state.currentNode.content"
      >
      </MonacoEditor>
      <MonacoEditor
        v-else
        class="w-3/4 h-full"
        :theme="isDark ? 'vs-dark' : 'vs'"
        :options="editor.options"
        :language="editor.language"
      />
    </div>
  </div>
</template>
