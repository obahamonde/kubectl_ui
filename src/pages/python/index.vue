<script setup lang="ts">
const $state = reactive({
  title: "Python",
  icon: "mdi-language-python",
});
</script>
<template>
  <div>
    <p>{{ $state.title }}</p>
    <Icon :icon="$state.icon" class="x2" />
  </div>
</template>
