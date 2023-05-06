<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useStore } from "~/hooks";
const { state } = useStore();

const toggle = ref(false);

const {
  isAuthenticated,
  user,
  loginWithRedirect,
  logout,
  getAccessTokenSilently,
} = useAuth0();

const authorize = async () => {
  const token = await getAccessTokenSilently();
  const { data } = await useFetch(`/api/auth?token=${token}`).json();
  state.user = unref(data);
};

onMounted(async () => {
  if (isAuthenticated.value) {
    await authorize();
  }
});
</script>
<template>
  <section v-if="isAuthenticated">
    <img
      :src="user.picture"
      class="rf br m-4 fixed sh x4 cp scale"
      @click="toggle = !toggle"
    />
    <div
      v-if="toggle"
      class="br bg-gray-200 rounded mb-4 h-24 mr-24 sh px-4 py-2 col center fixed fade-in-right"
    >
      <p class="text-center">{{ user.name }}</p>
      <button class="btn-del" @click="logout()">Logout</button>
    </div>
  </section>
  <section v-else>
    <Icon
      icon="mdi-account"
      class="rf br m-4 fixed sh x4 cp scale p-2"
      @click="loginWithRedirect()"
    />
  </section>
</template>
