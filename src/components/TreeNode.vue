<template>
  <div class="tree-node">
    <div class="tree-node-item" @click="toggleFolderOrLoadFile">
      <icon :icon="toIcon(node)" class="rf cp scale" />
      <span class="cp">{{ node.name }}</span>
    </div>
    <div v-if="isOpen && node.children" class="tree-node-children">
      <TreeNode
        v-for="(child, index) in node.children"
        :key="index"
        :node="child"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Node } from "~/hooks";
import { useStore } from "~/hooks";

const { state } = useStore();

const props = defineProps<{
  node: any;
}>();

const isOpen = ref(false);

const toggleFolderOrLoadFile = () => {
  if (props.node.type === "directory") {
    isOpen.value = !isOpen.value;
  } else {
    state.node = props.node;
  }
};

const toIcon = (node: Node) => {
  if (node.type === "file") {
    return fileToIcon(node.name);
  } else {
    return "mdi:folder";
  }
};

const fileToIcon = (fileName: string) => {
  const ext = fileName.split(".").pop();
  switch (ext) {
    case "js":
      return "logos:javascript";
    case "ts":
      return "logos:typescript-icon";
    case "py":
      return "logos:python";
    case "html":
      return "logos:html-5";
    case "css":
      return "logos:css-3";
    case "json":
      return "vscode-icons:file-type-light-json";
    case "md":
      return "logos:markdown";
    case "Pipfile":
      return "vscode-icons:file-type-pip";
    case "yml":
      return "fluent:document-yml-16-filled";
    case "yaml":
      return "fluent:document-yml-16-filled";
    case "lock":
      return "fluent:document-lock-16-filled";
    case "vue":
      return "logos:vue";
    case "gitignore":
      return "logos:git-icon";
    case "toml":
      return "logos:toml";
    default:
      return "mdi:file";
  }
};
</script>

<style scoped>
.tree-node {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
}

.tree-node-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.tree-node-children {
  padding-left: 1rem;
}
</style>
