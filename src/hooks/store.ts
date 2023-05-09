import { defineStore, acceptHMRUpdate } from "pinia";
import { User } from "./types";

export const useStore = defineStore("state", () => {
  const state = reactive({
    user: null as User | null,
    currentNode: null as any,
    node: null as any,
    notifications: [] as { message: string; status: string }[],
    remote: {
      owner: "",
      repo: "",
      source: "",
    },
    deployments: [] as any[],
    database: null as any,
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
