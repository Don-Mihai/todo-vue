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
</script>

<template>
  <h2>Ready</h2>
  <Tasks :onTaskClick="onTaskClick" title="Задачи" :tasks="store.tasks" />
</template>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
  padding: 2rem;
}
</style>
