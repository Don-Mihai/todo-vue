<script setup>
import { ref } from 'vue';
import Tasks from '../components/Tasks.vue';

const currentTask = ref({});
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
      <Tasks title="Задачи" :currentTask="currentTask" />
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

.tasks-banner {
  height: 200px;
  width: 100%;
  background-image: url('/src/assets/banner.png');
  background-repeat: no-repeat;
  background-position: center;
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
