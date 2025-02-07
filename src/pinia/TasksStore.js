import { defineStore } from 'pinia';
export const useTasksStore = defineStore('tasks', {
  state: () => ({ tasks: [{ title: 'test', completed: false }] }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    addTask(title) {
      this.tasks.push({
        id: this.tasks.length + 1,
        title,
        completed: false,
      });
    },
  },
});
