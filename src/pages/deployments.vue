<script setup lang="ts">
const { state } = useStore()
</script>
<template>
    <div>

        {{ state.user }}

    </div>
</template>