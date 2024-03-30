<script setup>
import { store as mobxStore } from '../mobx/store';
import { reactive } from '@vue/reactivity';
const store = reactive(mobxStore);

const props = defineProps({
  currentTask: Object,
});

const saveTask = () => {
  const fetchTask = store.tasks.find((task) => task.id === props.currentTask.id);
  if (props.currentTask.description !== fetchTask.description) {
    store.categorizeTask(props.currentTask);
  } else {
    store.updateTask(props.currentTask);
  }
};
</script>

<template>
  <div class="aside" v-if="currentTask.id">
    <button class="icon close-button" @click="currentTask = {}">x</button>
    <input type="text" v-model="currentTask.title" placeholder="Название задачи" class="input-field" />

    <div class="subtasks" v-for="(subtask, index) in currentTask.subtasks" :key="index">
      <input type="text" v-model="subtask.name" placeholder="Subtask title" class="input-field subtask-input" />
      <button @click="store.removeSubtask(currentTask)" class="icon subtask-remove">x</button>
    </div>
    <button @click="store.addSubtask(currentTask)" class="button add-subtask">Add Subtask</button>

    <textarea v-model="currentTask.description" placeholder="Описание задачи" class="textarea-field"></textarea>
    <input type="text" v-model="currentTask.category" placeholder="Категория" class="input-field" />
    <v-select v-model="currentTask.priority" :items="['Низкий', 'Средний', 'Высокий']" label="Приоритет" />
    <div class="aside__footer">
      <button @click="saveTask" class="button">Сохранить</button>
      <button @click="store.removeTask(currentTask)" class="button">Удалить</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  color: #000;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .icon {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    float: right;
  }

  .input-field,
  .textarea-field {
    width: 100%;
    margin-bottom: 16px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;

    &.textarea-field {
      resize: vertical;
    }
  }

  .aside__footer {
    display: flex;
    justify-content: space-between;

    .button {
      background-color: dodgerblue;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      margin-left: 8px;
    }
  }
}
.subtasks {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .subtask-input {
    flex-grow: 1;
    margin-right: 8px;
    margin-bottom: 4px;
  }

  .subtask-remove {
    font-size: 18px;
    color: #777;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}

.add-subtask {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 8px;
  &:hover {
    background-color: #45a049;
  }
}
</style>
