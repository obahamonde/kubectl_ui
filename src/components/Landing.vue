<script setup lang="ts">
const el = ref<HTMLElement | null>(null);

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 880, y: 200 },
});
</script>
<template>
  <section class="bg-secondary col center h-screen">
    <h1 class="text-cyan text-6xl font-cursive m-8">
      Welcome to <strong class="text-title text-6xl">CubeCTL</strong>
    </h1>
    <p class="text-white text-4xl text-center font-bold font-cursive m-8">
      The platform suitable for all developers
    </p>
    <div ref="el" :style="style" style="position: fixed">
      <img src="/logo.gif" class="rf x12 cp scale hover:animate-spin" />
    </div>
  </section>
</template>
