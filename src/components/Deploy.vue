<script setup lang="ts">
const { state } = useStore();
const deployRepo = async () => {
  const { data } = await useFetch(
    "/api/deploy/" + state.remote.owner + "/" + state.remote.repo,
    {
      method: "POST",
    }
  ).json();
  const { url } = unref(data);
  state.deployments.includes(url) ? null : state.deployments.push(url);
};
</script>
<template>
  <Dark />
  <div class="col center top-50 relative">
    <button class="btn-get" @click="deployRepo()">Deploy</button>
    <section>
      <p v-for="(item, index) in state.deployments" :key="index">
        <a :href="item" target="_blank">{{ item }}</a>
      </p>
    </section>
  </div>
</template>
