<script setup lang="ts">
const tree = ref<any>();
const { state } = useStore();

const getNodes = async () => {
  const { data } = await useFetch(
    "/api/clone/" + state.remote.owner + "/" + state.remote.repo
  ).json();
  tree.value = unref(data);
};

const showModal = ref(false);
const newNodeName = ref("");
const newNodeType = ref("file");

const addNewChildNode = () => {
  showModal.value = true;
};

const saveNewChildNode = () => {
  if (newNodeName.value.trim()) {
    tree.value.push({
      name: newNodeName.value,
      type: newNodeType.value,
      children: newNodeType.value === "directory" ? [] : null,
    });
    newNodeName.value = "";
    newNodeType.value = "file";
    showModal.value = false;
  }
};
const cancelNewChildNode = () => {
  newNodeName.value = "";
  newNodeType.value = "file";
  showModal.value = false;
};
</script>
<template>
  <p class="col center">
    <input
      type="text"
      v-model="state.remote.owner"
      placeholder="owner"
      class="input text-center"
    />
    <input
      type="text"
      v-model="state.remote.repo"
      placeholder="repo"
      class="input text-center"
      @keyup.enter="getNodes()"
    />
  </p>
  <div class="tree" v-if="tree">
    <Icon
      icon="mdi-plus"
      class="cp scale rf m-4 sh x2 p-2 hover:text-cyan"
      @click="addNewChildNode"
    />
    <tree-node v-for="(node, index) in tree" :key="index" :node="node" />
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
<style scoped>
.tree {
  font-family: "Fira Code", monospace;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  border-radius: 0.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 2rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
