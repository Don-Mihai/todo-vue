import { makeAutoObservable } from "mobx";

class Store {
  tasks = [];
  tasksComplete = [];

  constructor() {
    makeAutoObservable(this);
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
    this.tasks[taskIndex] = { ...task, status: !task.status };
    console.log(this.tasks);
  }
}

export const store = new Store();
