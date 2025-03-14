import axios from 'axios';
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
    async addTaskBack(title) {
      const task = (await axios.post('http://localhost:5005/tasks/create', { title })).data;
      this.tasks.push(task);
    },
    async editTaskBack(task) {
      const taskRes = (await axios.post('http://localhost:5005/tasks/edit', task)).data;

      const index = this.tasks.findIndex((task) => task.id === taskRes?.id);
      this.tasks[index] = taskRes;
    },
    async getTasks() {
      const tasks = (await axios.post('http://localhost:5005/tasks/get-all', { title })).data;
      this.tasks = tasks;
    },
    deleteTask(id) {
      console.log(id);
      this.tasks = this.tasks.filter((task) => task.id !== id);

      console.log(this.tasks);
    },
  },
});
