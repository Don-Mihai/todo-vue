<script setup>
import { ref } from 'vue';
import Tasks from './Tasks.vue';
import Aside from './Aside.vue';
const currentTask = ref({});
const onTaskClick = (task) => {
  currentTask.value = { ...task };
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
      <Tasks :hideInput :onTaskClick :title :tasks />
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

  .tasks-banner {
    height: 100px;
    width: 100%;
    background-image: url('/src/assets/banner.png');
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease-in-out;

    &__day {
      margin-left: 20px;
    }

    &:hover {
      height: 150px;
    }
  }
}
</style>
