<template>
  <div class="tree-node">
    <div class="tree-node-item" v-if="nodeRef">
      <icon
        :icon="toIcon(nodeRef!)"
        class="rf cp scale"
        @click="toggleFolderOrLoadFile"
      />
      <span class="cp">{{ nodeRef!.name }}</span>
      <Icon
        icon="mdi-delete"
        class="cp scale rf m-4 sh x2 p-2 hover:text-cyan"
        @click="deleteNode(nodeRef!)"
      />
    </div>
    <div v-if="isOpen && nodeRef!.children" class="tree-node-children">
      <Icon
        icon="mdi-plus"
        class="cp scale rf m-4 sh x2 p-2 hover:text-cyan"
        @click="addNewChildNode"
      />
      <TreeNode
        v-for="(child, index) in nodeRef!.children"
        :key="index"
        :node="child"
      />
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <label for="nodeName">Name:</label>
        <input type="text" id="nodeName" v-model="newNodeName" />
        <label for="nodeType">Type:</label>
        <select id="nodeType" v-model="newNodeType">
          <option value="file">File</option>
          <option value="directory">Directory</option>
        </select>
        <button btn-get @click="saveNewChildNode">Save</button>
        <button btn-del @click="cancelNewChildNode">Cancel</button>
      </div>
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

const nodeRef = ref<Node | undefined>(props.node);

const toggleFolderOrLoadFile = () => {
  if (nodeRef.value!.type === "directory") {
    isOpen.value = !isOpen.value;
  } else {
    state.node = nodeRef.value;
  }
};

const toIcon = (node: Node) => {
  if (nodeRef.value!.type === "file") {
    return fileToIcon(nodeRef.value!.name);
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

const showModal = ref(false);
const newNodeName = ref("");
const newNodeType = ref("file");

const addNewChildNode = () => {
  showModal.value = true;
};

const saveNewChildNode = () => {
  if (newNodeName.value.trim()) {
    nodeRef.value!.children!.push({
      name: newNodeName.value,
      type: newNodeType.value as "file" | "directory",
      children: newNodeType.value === "directory" ? ([] as Node[]) : undefined,
    });
    cancelNewChildNode();
  }
};

const cancelNewChildNode = () => {
  newNodeName.value = "";
  newNodeType.value = "file";
  showModal.value = false;
};

const deleteNode = (node: Node) => {
  if (!nodeRef.value!.children) {
    nodeRef.value = undefined;
  } else if (nodeRef.value!.children!.length === 1) {
    nodeRef.value!.children = undefined;
  } else {
    const index = nodeRef.value!.children!.indexOf(node);
    nodeRef.value!.children!.splice(index, 1);
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
