<script setup lang="ts">
const items = reactive([
  {
    to: "/",
    title: "Home",
    icon: "mdi-home",
  },
  {
    to: "/buckets",
    title: "Buckets",
    icon: "mdi-bucket",
  },
  {
    to: "/runners",
    title: "Runners",
    icon: "mdi-cube-outline",
  },
  {
    to: "/database",
    title: "Database",
    icon: "mdi-database",
  },
  {
    to: "/editor",
    title: "Editor",
    icon: "mdi-code-braces",
  },
  {
    to: "/deployments",
    title: "Deployments",
    icon: "mdi-rocket",
  },
]);

const showTitle = (title: string) => {
  const element = document.getElementById(title);
  if (element) {
    element.classList.remove("hidden");
  }
};

const hideTitle = (title: string) => {
  const element = document.getElementById(title);
  if (element) {
    element.classList.add("hidden");
  }
};
</script>

<template>
  <nav
    class="bg-gray-200 sh w-128 mx-auto text-white bottom-0 right-0 left-0 fixed rounded-lg shadow-lg shadow-white h-16 row center gap-6 hover:gap-8"
  >
    <div v-for="item in items" class="col center">
      <span
        :id="item.title"
        class="bg-gray-800 text-white rounded px-2 py-1 hidden fixed translate-y--16 translate-x-4"
        >{{ item.title }}</span
      >
      <RouterLink :to="item.to" :title="item.title" class="navbar__link">
        <Icon
          :icon="item.icon"
          x3
          style="z-index: 9999"
          @mouseover="showTitle(item.title)"
          @mouseleave="hideTitle(item.title)"
        />
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar__link {
  @apply col center gap-2 text-gray-800;
  @apply text-sm font-semibold;
}

.navbar__link:hover {
  @apply text-white;
  @apply hover:text-cyan hover:scale hover:translate-y--2 hover:translate-x-4;
}

.nav-link-exact-active {
  @apply text-cyan;
}
</style>
