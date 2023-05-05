<script setup lang="ts">
import { Upload } from "~/hooks";
import { useAuth0 } from "@auth0/auth0-vue";
const filesData = reactive<Upload[]>([]);
const filesUpload = reactive<any[]>([]);
const { user } = useAuth0();

const onDrop = async (files: File[] | null) => {
  if (!files) return;
  files
    .map((file) => {
      const url = useObjectUrl(file);
      return {
        user: user.value.sub as string,
        name: file.name,
        key: user.value.sub as string,
        size: file.size,
        url: url.value,
        type: file.type,
        lastModified: file.lastModified,
        file: file,
      };
    })
    .forEach(async (file) => {
      filesData.push(file);
      const formData = new FormData();
      formData.append("file", file.file);
      const { data } = await useFetch(
        `/api/upload?key=${file.key}&size=${file.size}&user=${file.user}`,
        {
          method: "POST",
          body: formData,
        }
      ).json();
      filesUpload.push(unref(data));
    });
  await getFiles();
};
const dropZoneRef = ref<HTMLElement>();

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const useInputEl = () => {
  const el = document.createElement("input");
  el.onchange = (e) => {
    const files = (e.target as HTMLInputElement).files as FileList;
    onDrop(Array.from(files));
  };
  el.setAttribute("type", "file");
  el.setAttribute("multiple", "true");
  el.setAttribute("accept", "*/*");
  el.click();
};

const deleteFile = async (file: Upload) => {
  await useFetch(`/api/upload?ref=${file.ref}`, {
    method: "DELETE",
  }).json();
  filesData.splice(filesData.indexOf(file), 1);
  filesUpload.splice(filesUpload.indexOf(file), 1);
  await getFiles();
};

const getFiles = async () => {
  const { data } = await useFetch(
    `/api/upload?user=${user.value.sub as string}`
  ).json();
  const files = unref(data);
  files.forEach((file: any) => {
    filesUpload.push(file);
  });
};

onMounted(async () => {
  await getFiles();
});
</script>

<template>
  <div class="flex gap-4">
    <div class="w-full relative rounded-lg sh h-100vh">
      <div
        ref="dropZoneRef"
        @click="useInputEl"
        multiple
        class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6"
      >
        <div>
          {{ isOverDropZone ? "Drop here" : "Drag and drop files here" }}
        </div>
      </div>
      <div class="col center m-8">
        <div class="grid3 p-8 gap-8">
          <div
            v-for="(file, index) in filesUpload"
            :key="index"
            class="col bg-gray-100 sh center gap-2 p-4"
          >
            <p class="row gap-4">
              <Icon
                icon="mdi-close"
                @click="deleteFile(file)"
                class="x2 cp hover:red-700 text-red-500 scale"
              />
            </p>
            <p class="text-sm font-body">{{ file.name }}</p>
            <p class="text-sm font-body">
              {{ (file.size / 1000).toFixed(2) }} Kb
            </p>
            <p class="text-sm font-body">{{ file.type }}</p>
            <p class="text-sm font-body">
              {{ new Date(file.lastModified).toLocaleString() }}
            </p>

            <div class="col center p-8">
              <div v-if="file.type.includes('image')">
                <img :src="file.url" />
              </div>
              <div v-else-if="file.type.includes('video')">
                <video controls :src="file.url" />
              </div>
              <div v-else-if="file.type.includes('audio')">
                <audio controls :src="file.url" />
              </div>
              <div v-else>
                <Icon icon="mdi-file" class="x4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
