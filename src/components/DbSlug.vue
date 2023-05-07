<script setup lang="ts">
const show = ref(false);
</script>

<template>
  <div class="col center">
    <Icon
      icon="mdi-database-lock"
      class="text-primary m-4 x4 p-1 dark:brightness-200"
    />

    <div class="showmore">
      FaunaDB is a document relational database powered by
      <strong>AioFauna</strong> framework, it manages the relationships, filters
      and indexes to access the data through <strong>Aiofauna</strong> framework
      Object Document Mapper (ODM) providing a simple API to interact with the
      database
    </div>

    <Icon
      icon="logos:fauna-icon"
      class="text-purple-700 m-4 x4 p-1 dark:brightness-200"
    />

    <div class="showmore">
      Do you want to learn more about FaunaDB? Visit their official website
      <a href="https://fauna.com/" target="_blank" class="text-primary">here</a>
      and their official documentation
      <a
        href="https://docs.fauna.com/fauna/current/"
        target="_blank"
        class="text-primary"
        >here</a
      >
    </div>
    <img
      src="/logo.svg"
      class="text-purple-700 m-4 x4 p-1 dark:brightness-200"
      @click="show = !show"
    />

    <div class="showmore">
      Do you wanna know more about AioFauna? Start developing your own project
      by watching the following video:

      <video src="/aiofauna.mp4" controls class="w-full h-auto" />
    </div>
  </div>
</template>
<style scoped>
.showmore {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
  font-size: 20px;
  color: #000;
  margin: 0 auto;
  width: 50%;
  border-radius: 10px;
}
</style>
