<script setup>
import Banner from '@/components/Banner.vue';
import Tasks from '@/components/Tasks.vue';
import Aside from '@/components/Aside.vue';
import { ref } from 'vue';

const tasks = ref([]);
const currentTask = ref({});
</script>

<template>
  <div class="wrapper-tasks">
    <div class="main-tasks">
      <Banner />
      <Tasks :onTaskClick :title="Задачи" :tasks />
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
