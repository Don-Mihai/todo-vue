import axios from 'axios';
import { makeAutoObservable } from 'mobx';

class Store {
  tasks = [];
  tasksComplete = [];
  tasksUncomplete = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getTasks() {
    const tasks = (await axios.get('https://65f2c67a105614e6549ec665.mockapi.io/tasks')).data;

    this.tasks = tasks;
  }

  async addTask(task) {
    const taskRes = (await axios.post('https://65f2c67a105614e6549ec665.mockapi.io/tasks', task)).data;
    this.tasks.push(taskRes);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  editTask(task, newTask) {
    const taskIndex = this.tasks.findIndex((t) => t === task);
    this.tasks[taskIndex] = newTask;
  }

  changeStatus(task) {
    const taskIndex = this.tasks.findIndex((t) => t === task);
    this.tasks[taskIndex].status = !this.tasks[taskIndex].status;
  }
}

export const store = new Store();
