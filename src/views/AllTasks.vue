<script setup>
import { ref } from 'vue';
import { reactive } from '@vue/reactivity';
import { store as mobxStore } from '../mobx/store';

const store = reactive(mobxStore);

const inputValue = ref('');
const currentTask = ref({});

const save = () => {
  store.addTask({ title: inputValue.value, status: false });

  inputValue.value = '';
};
</script>

<template>
  <div class="wraper-tasks">
    <div class="main-tasks">
      <div class="tasks-banner">
        <div class="tasks-banner__day">
          <h2 class="title">Мой день</h2>
          <div class="day">воскресенье, 10 февраля</div>
        </div>
      </div>
      <div class="tasks-action">
        <div class="tasks">
          <h2 class="tasks-title">Задачи</h2>
          <div @click="currentTask = task" class="task" v-for="task in store.tasks" :class="{ 'task-checkbox--checked': task.status }">
            <input type="checkbox" class="task-checkbox" :checked="task.status" @change="store.changeStatus(task)" />{{ task.title }}
          </div>
        </div>
        <input class="task-input" v-model="inputValue" @keydown.enter="save" type="text" placeholder="Введите задачу" />
      </div>
    </div>
    <aside v-if="Boolean(currentTask.title)" class="aside">
      <button @click="currentTask = {}">x</button>
      <input v-model="currentTask.title" type="text" />
    </aside>
  </div>
</template>
<style scoped>
.wraper-tasks {
  display: flex;
  align-items: center;
  width: 100%;
}

.main-tasks {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.aside {
  height: 100%;
  width: 300px;
}
.task {
  color: #000;
}
.tasks-action {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
}
.tasks {
  width: 100%;
  padding: 20px;
  overflow: auto;
}
.task-input {
  width: 90%;
  height: 40px;
  padding-left: 10px;
}
.tasks-title {
  color: #000;
  text-align: center;
}
.tasks-banner {
  height: 200px;
  width: 100%;
  background-image: url('/src/assets/banner.png');
  background-repeat: no-repeat;
  background-position: center;
}
.task-checkbox {
  margin-right: 10px;
}

.task-checkbox--checked {
  text-decoration: line-through;
}

.tasks-banner {
  display: flex;
  align-items: end;
  padding: 50px;
  justify-content: space-between;
}
.tasks-banner__buttons {
  display: flex;
  gap: 10px;
}
button {
  width: 25px;
  height: 25px;
}
</style>
