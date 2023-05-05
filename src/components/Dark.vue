<template>
    <button icon class="btn-circle  tr fixed m-4" @click="toggleDark()">
        <Icon :icon="!isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'" class="rf x2 scale cp tr absolute" />
    </button>
</template>