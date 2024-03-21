<script setup>
import { store as mobxStore } from '../mobx/store';
import { reactive } from '@vue/reactivity';
import LayoutTasks from '../components/LayoutTasks.vue';

const store = reactive(mobxStore);
</script>

<template>
  <LayoutTasks title="Запланированные" :tasks="store.tasks?.filter((item) => !item.status)" />
</template>
