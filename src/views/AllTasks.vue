<script setup>
import { store as mobxStore } from '../mobx/store';
import { reactive } from '@vue/reactivity';
import LayoutTasks from '../components/LayoutTasks.vue';
import { onMounted } from 'vue';

const store = reactive(mobxStore);

onMounted(() => {
  store.getTasks();
});
</script>

<template>
  <LayoutTasks title="Задачи" :tasks="store.tasks" />
</template>
