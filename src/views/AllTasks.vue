<script setup>
import Banner from '@/components/Banner.vue';
import Tasks from '@/components/Tasks.vue';
import Aside from '@/components/Aside.vue';
import { onMounted, ref } from 'vue';
import { useTasksStore } from '@/pinia/TasksStore';

const { tasks, getTasks } = useTasksStore();
const currentTask = ref({});

const updateCurrentTask = (task) => {
  currentTask.value = task;
};

onMounted(() => {
  getTasks();
});
</script>

<template>
  <div class="wrapper-tasks">
    <div class="main-tasks">
      <Banner />
      <Tasks @updateCurrentTask="updateCurrentTask" title="Задачи" :tasks />
    </div>
    <Aside :currentTask @closeTask="currentTask = {}"></Aside>
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
