import { defineStore, acceptHMRUpdate } from "pinia";
import { User, Node } from "./types";

export const useStore = defineStore("state", () => {
  const state = reactive({
    user: null as User | null,
    notifications: [] as { message: string; status: string }[],
    currentFile: null as Node | null,
    currentFolder: null as Node | null,
  });

  const setState = (newState: any) => {
    Object.assign(state, newState);
  };

  const notify = (message: string, status: string) => {
    state.notifications.push({ message, status });
  };

  return {
    state,
    notify,
    setState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
