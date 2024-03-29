import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import OpenAI from 'openai'; // Предполагаем, что у вас уже установлена библиотека OpenAI

const openaiKey = import.meta.env.VITE_OPENAI_KEY;

const openai = new OpenAI({ apiKey: openaiKey, dangerouslyAllowBrowser: true });

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

  async updateTask(task) {
    const updatedTask = (await axios.put(`https://65f2c67a105614e6549ec665.mockapi.io/tasks/${task.id}`, task)).data;
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks[taskIndex] = updatedTask;
  }

  async removeTask(task) {
    const deletedTask = (await axios.delete(`https://65f2c67a105614e6549ec665.mockapi.io/tasks/${task.id}`)).data;
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks.splice(taskIndex, 1);
  }

  editTask(task, newTask) {
    const taskIndex = this.tasks.findIndex((t) => t === task);
    this.tasks[taskIndex] = newTask;
  }

  changeStatus(task) {
    const taskIndex = this.tasks.findIndex((t) => t === task);
    this.tasks[taskIndex].status = !this.tasks[taskIndex].status;
  }

  async categorizeTask(task) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You should categorize the task based on its content and context, output JSON' },
          { role: 'user', content: task.description },
        ],
        model: 'gpt-3.5-turbo-0125',
        response_format: { type: 'json_object' },
      });

      // Получаем предсказанную категорию
      const predictedCategory = completion.data.choices[0].message?.content;

      console.log(predictedCategory);

      // Обновляем задачу с предсказанной категорией
      task.category = predictedCategory;
      this.updateTask(task);
    } catch (error) {
      console.error('Ошибка при категоризации задачи:', error);
    }
  }
}

export const store = new Store();
