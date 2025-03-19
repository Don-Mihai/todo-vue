import axios from 'axios';
import { defineStore } from 'pinia';
export const useTasksStore = defineStore('tasks', {
  state: () => ({ tasks: [], currentTask: {} }),
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
      this.tasks.splice(0, this.tasks.length);

      const tasks = (await axios.post('http://localhost:5005/tasks/get-all', { title })).data;
      tasks.forEach((element) => {
        this.tasks.push(element);
      });
    },
    async deleteTask(id) {
      const taskRes = (await axios.post('http://localhost:5005/tasks/delete', { id })).data;
      this.tasks = this.tasks.filter((task) => task.id !== taskRes.id);
    },
  },
});
