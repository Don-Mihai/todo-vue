import { defineStore } from 'pinia';
export const useTasksStore = defineStore('tasks', {
  state: () => ({ tasks: [{ id: 1, title: 'test', status: false, priority: 'Низкий', important: false, isTimerOn: false, time: 0 }], currentTask: {} }),
  actions: {
    addTask(title) {
      this.tasks.push({
        id: this.tasks.length + 1,
        title,
        status: false,
      });
    },
    deleteTask(id) {
      console.log(id);
      this.tasks = this.tasks.filter((task) => task.id !== id);

      console.log(this.tasks);
    },
  },
});
