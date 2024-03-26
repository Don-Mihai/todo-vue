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

  addTask(task) {
    this.tasks.push(task);
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
