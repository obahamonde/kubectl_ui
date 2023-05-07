<script setup lang="ts">
const { state, notify } = useStore();
const getDatabaseKey = async () => {
    const { data } = await useFetch(
        `/api/db/${state.user!.ref}`).json();

    const { secret, database } = unref(data);

    state.database = { secret, database };
}

const show = ref(false);

const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    notify("Copied to clipboard!", "success");
}

</script>
<template>
    <main class="col center fade-in gap-4 p-20 text-center">
        <DbSlug />
        <div v-if="state.database" class="gap-4">
            <p class="my-4"><strong>Database ID: </strong>: {{ state.database.database }}</p>
            <p class="my-4"><strong>Database Secret: </strong>{{ show ? state.database.secret : '*******' }}</p>
            <p class="row center">
                <Icon :icon="show ? 'mdi-eye-off' : 'mdi-eye'" @click="show = !show" class="
            cp scale rf m-4  sh x2 p-2
            " />
                <Icon icon="mdi-clipboard" class="cp scale rf m-4  sh x2 p-2 hover:text-cyan "
                    @click="copy(state.database.secret)" />
            </p>
        </div>
        <div v-else>
            <button class="btn-get" @click="getDatabaseKey()">Get Database Key</button>
        </div>
    </main>
</template>