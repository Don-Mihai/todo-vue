<template>
  <div class="tasks-action">
    <div class="tasks">
      <h2 class="tasks-title">{{ title }}</h2>
      <div @click.self="$emit('updateCurrentTask', task)" class="task" v-for="task in tasks" :class="{ isChecked: task.status }">
        <input type="checkbox" class="checkbox" :checked="task.status" @change="task.status = !task.status" />
        {{ task.title }}
        <div class="priority" :class="{ isGreen: task.priority === 'Низкий', isYelow: task.priority === 'Средний', isRed: task.priority === 'Высокий' }">
          {{ task.priority }}
        </div>
      </div>
    </div>
    <input v-if="!hideInput" class="task-input" v-model="inputValue" @keydown.enter="save" type="text" placeholder="Введите задачу" />
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  tasks: Array,
  title: String,
  hideInput: Boolean,
});

const inputValue = ref();

const save = async () => {
  props.tasks.push({ id: props.tasks.length + 1, title: inputValue.value, status: false });

  inputValue.value = '';
};

console.log('props.tasks', props.tasks);
</script>

<style scoped>
.task {
  position: relative;
  margin-bottom: 10px;
  padding: 10px;
  color: #000;
  background-color: rgba(0, 0, 0, 0.1);
  animation: addTask 0.5s ease-in-out;
}

@keyframes addTask {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  height: 100%;
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

.checkbox {
  margin-right: 10px;
}

.isChecked {
  text-decoration: line-through;
  /* animation: deleteTaskAnimation 0.5s ease-in-out; */
}

/* @keyframes deleteTaskAnimation {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
} */

.priority {
  position: absolute;
  right: 10px;
  top: 4px;
  border-radius: 8px;
  padding: 0 4px;
}

.isGreen {
  background-color: aquamarine;
}
.isYelow {
  background-color: yellow;
}
.isRed {
  background-color: red;
}
</style>
