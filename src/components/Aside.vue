<script setup>
import { useTasksStore } from '@/pinia/TasksStore';
const props = defineProps({
  currentTask: Object,
});

const { deleteTask } = useTasksStore();

const saveTask = () => {};
</script>

<template>
  <div class="aside" v-if="currentTask.id">
    <button class="icon" @click="$emit('closeTask')">x</button>
    <input type="text" v-model="currentTask.title" placeholder="Название задачи" class="input-field" />

    <textarea v-model="currentTask.description" placeholder="Описание задачи" class="textarea-field"></textarea>
    <input type="text" v-model="currentTask.category" placeholder="Категория" class="input-field" />
    <v-select v-model="currentTask.priority" :items="['Низкий', 'Средний', 'Высокий']" label="Приоритет" />
    <div class="aside__footer">
      <button @click="saveTask" class="button">Сохранить</button>
      <button @click="deleteTask(currentTask.id)" class="button">Удалить</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.aside {
  width: 300px;
  height: 100%;
  background-color: white;
  color: #000;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  animation: asideSlideIn 0.5s;

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

@keyframes asideSlideIn {
  from {
    width: 0;
    transform: translateX(100%);
  }
  to {
    width: 300px;
    transform: translateX(0);
  }
}
</style>
