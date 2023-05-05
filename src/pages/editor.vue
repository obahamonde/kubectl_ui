<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';

const editor = reactive({
    code: '',
    language: 'javascript',
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
    }
});





</script>
<template>
    <Dark style="z-index: 9999" />
    <div class="row">


        <aside class="
        bg-gray-200 w-1/3 p-4 h-screen
        
        ">

            <Tree />



        </aside>



        <MonacoEditor :theme="isDark ? 'vs-dark' : 'vs'" :options="editor.options" :language="editor.language"
            v-model:value="editor.code">
        </MonacoEditor>
    </div>
</template>