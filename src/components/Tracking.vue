<script setup lang="ts">
const track = ref([] as any[]);
const image = ref("");
const event = computed(() =>
    image.value.length > 3
        ? new EventSource(`/api/docker/pull?image=${image.value}`)
        : null
);
watch(event, (value) => {
    if (value) {
        value.onmessage = (e) => {
            track.value.push(e.data);
        };
    }
});

watchEffect(() => {
    if (image.value.length < 2) {
        track.value = [];

    }
});
</script>

<template>
          <input type="text input" v-model="image" />
          <div v-for="item in track" :key="item" class="col center">
            <p class="col center">{{ item }}</p>
          </div>
</template>
