<script setup>
import Banner from '@/components/Banner.vue';
import Tasks from '@/components/Tasks.vue';
import Aside from '@/components/Aside.vue';
import { ref, onMounted } from 'vue';
import { useTasksStore } from '@/pinia/TasksStore';

const { tasks, currentTask, getTasks } = useTasksStore();

onMounted(() => {
  getTasks();
});
</script>

<template>
  <div class="wrapper-tasks">
    <div class="main-tasks">
      <Banner />
      <Tasks :onTaskClick title="Завершенные задачи" :tasks="tasks.filter((task) => task.status)" />
    </div>
    <Aside :currentTask></Aside>
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
}
</style>
