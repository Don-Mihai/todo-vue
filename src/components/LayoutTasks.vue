<script setup>
import { ref } from 'vue';
import Tasks from '../components/Tasks.vue';
import { store as mobxStore } from '../mobx/store';
import { reactive } from '@vue/reactivity';
const store = reactive(mobxStore);
const currentTask = ref({});
const onTaskClick = (task) => {
  currentTask.value = task;
};
const props = defineProps({
  title: String,
  tasks: Array,
  hideInput: Boolean,
});
</script>

<template>
  <div class="wrapper-tasks">
    <div class="main-tasks">
      <div class="tasks-banner">
        <div class="tasks-banner__day">
          <h2 class="title">Мой день</h2>
          <div class="day">воскресенье, 11 февраля</div>
        </div>
      </div>
      <Tasks :hideInput="hideInput" :onTaskClick="onTaskClick" :title="title" :tasks="tasks" />
    </div>

    <div class="aside" v-if="currentTask.id">
      <button class="icon close-button" @click="currentTask = {}">x</button>
      <input type="text" v-model="currentTask.title" placeholder="Название задачи" class="input-field" />
      <textarea v-model="currentTask.description" placeholder="Описание задачи" class="textarea-field"></textarea>
      <input type="text" v-model="currentTask.category" placeholder="Категория" class="input-field" />
      <v-select v-model="currentTask.priority" :items="['Низкий', 'Средний', 'Высокий']" label="Приоритет" />
      <div class="aside__footer">
        <button @click="store.categorizeTask(currentTask)" class="button">Сохранить</button>
        <button @click="store.removeTask(currentTask)" class="button">Удалить</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-tasks {
  display: flex;
  width: 100%;

  .main-tasks {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

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

  .tasks-banner {
    height: 200px;
    width: 100%;
    background-image: url('/src/assets/banner.png');
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: end;
    padding: 50px;
    justify-content: space-between;

    &__day {
      .title {
        margin-bottom: 0;
      }
    }
  }
}
</style>
