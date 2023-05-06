<script setup lang="ts">
const tree = ref<any>();
const owner = ref("");
const repo = ref("");
const getNodes = async () => {
  const { data } = await useFetch(
    "/api/clone/" + owner.value + "/" + repo.value
  ).json();
  tree.value = unref(data);
};
</script>
<template>
  <p class="col center">
    <input
      type="text"
      v-model="owner"
      placeholder="owner"
      class="input text-center"
    />
    <input
      type="text"
      v-model="repo"
      placeholder="repo"
      class="input text-center"
      @keyup.enter="getNodes()"
    />
  </p>
  <div class="tree" v-if="tree">
    <tree-node v-for="(node, index) in tree" :key="index" :node="node" />
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
</style>
