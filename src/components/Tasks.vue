<template>
  <div class="tasks-action">
    <div class="tasks">
      <h2 class="tasks-title">{{ title }}</h2>
      <div @click="onTaskClick(task)" class="task" v-for="task in tasks" :class="{ 'task-checkbox--checked': task.status }">
        <input type="checkbox" class="task-checkbox" :checked="task.status" @change="store.changeStatus(task)" />{{ task.title }}
      </div>
    </div>
    <input class="task-input" v-model="inputValue" @keydown.enter="save" type="text" placeholder="Введите задачу" />
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
import { store as mobxStore } from '../mobx/store';
import { reactive } from '@vue/reactivity';

const props = defineProps({
  title: String,
  onTaskClick: Function,
  tasks: Array,
});

const store = reactive(mobxStore);
const inputValue = ref('');

const save = () => {
  store.addTask({ title: inputValue.value, status: false });

  inputValue.value = '';
};
</script>

<style scoped>
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

.task-checkbox {
  margin-right: 10px;
}

.task-checkbox--checked {
  text-decoration: line-through;
}
</style>
