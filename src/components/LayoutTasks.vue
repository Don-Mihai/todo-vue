<script setup>
import { ref } from 'vue';
import Tasks from './Tasks.vue';
import Aside from './Aside.vue';
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
    <Aside :currentTask="currentTask"></Aside>
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
