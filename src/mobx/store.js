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

  async editTask(task, newTask) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    const updatedTask = await axios.put(`https://65f2c67a105614e6549ec665.mockapi.io/tasks/${task.id}`, newTask);
    this.tasks[taskIndex] = updatedTask.data;
  }

  async changeStatus(task) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    const updatedTask = await axios.put(`https://65f2c67a105614e6549ec665.mockapi.io/tasks/${task.id}`, {
      ...task,
      status: !task.status,
    });
    this.tasks[taskIndex] = updatedTask.data;
  }

  async categorizeTask(task) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'You should categorize the task based on its content and context, examples are: Home tasks, Work, Study, Personal goals, Health, Finances, Leisure and entertainment, Shopping, Family and friends, Beauty and health, Car, Travel, Hobbies, Charity, Agriculture, Pets, Garden and yard, Repair and construction, Sports, Education, Career, Reading, Music, Movies and TV, Games, Internet and technology, Languages, Skills, Family, Friends, Events, Birthdays, Holidays, Other',
          },
          { role: 'user', content: task.description },
        ],
        model: 'gpt-3.5-turbo',
      });

      // Получаем предсказанную категорию
      const predictedCategory = completion.choices[0].message?.content;

      // Обновляем задачу с предсказанной категорией
      task.category = predictedCategory;
      this.updateTask(task);
    } catch (error) {
      console.error('Ошибка при категоризации задачи:', error);
    }
  }

  async addSubtask(task) {
    try {
      const payload = {
        ...task,
        subtasks: task.subtasks
          ? [
              ...task.subtasks,
              {
                id: Date.now(),
                name: 'New subtask',
                status: false,
              },
            ]
          : [
              {
                id: Date.now(),
                name: 'New subtask',
                status: false,
              },
            ],
      };
      const response = await axios.put(`https://65f2c67a105614e6549ec665.mockapi.io/tasks/${task.id}`, payload);
    } catch (error) {
      console.error('Failed to add subtask:', error);
    }
  }

  async removeSubtask(task, subtask) {
    try {
      await axios.delete(`/tasks/subtask/${subtask.id}`);
      task.subtasks = task.subtasks.filter((s) => s.id !== subtask.id);
    } catch (error) {
      console.error('Failed to remove subtask:', error);
    }
  }
}

export const store = new Store();
