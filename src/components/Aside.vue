<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useTasksStore } from '@/pinia/TasksStore';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

const props = defineProps({
  currentTask: Object,
});

const { deleteTask, editTaskBack } = useTasksStore();
const emit = defineEmits(['closeTask']);

const idTimer = ref(null);

const saveTask = () => {
  editTaskBack(props.currentTask);
};

const onTimerClick = () => {
  props.currentTask.isTimerOn = !props.currentTask.isTimerOn;

  if (!props.currentTask.isTimerOn) {
    clearInterval(idTimer.value);
  } else {
    idTimer.value = setInterval(() => {
      props.currentTask.time++;
    }, 1000);
  }
};
const handleClickOutside = (event) => {
  const asideElement = document.querySelector('.aside');
  const tasksElement = event.target.closest('.task');
  const menuList = event.target.closest('.p-menu-list');

  if (asideElement && !asideElement.contains(event.target) && !tasksElement && !menuList) {
    emit('closeTask');
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Экспорт',
        icon: 'pi pi-upload',
      },
    ],
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="aside" v-if="currentTask.id">
    <div class="timer">
      <p class="time">{{ currentTask.time }} сек.</p>
      <Button
        label="Таймер"
        :icon="[currentTask.isTimerOn ? 'pi pi-pause-circle' : 'pi pi-play-circle']"
        :severity="currentTask.isTimerOn ? 'danger' : 'success'"
        iconPos="right"
        size="small"
        @click="onTimerClick"
      />
    </div>

    <button class="close" @click="$emit('closeTask')">x</button>
    <input type="text" v-model="currentTask.title" placeholder="Название задачи" class="input-field" />

    <textarea v-model="currentTask.description" placeholder="Описание задачи" class="textarea-field"></textarea>
    <input type="text" v-model="currentTask.category" placeholder="Категория" class="input-field" />
    <v-select v-model="currentTask.priority" :items="['Низкий', 'Средний', 'Высокий']" label="Приоритет" />
    <div class="aside__footer">
      <button @click="saveTask" class="button">Сохранить</button>
      <button @click="deleteTask(currentTask.id)" class="button">Удалить</button>
      <div class="card flex justify-center">
        <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.aside {
  position: relative;
  width: 300px;
  height: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  animation: asideSlideIn 0.5s;

  .close {
    position: absolute;
    top: -5px;
    right: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    float: right;
  }

  .input-field,
  .textarea-field {
    width: 100%;
    margin-bottom: 16px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: var(--color-text);

    &.textarea-field {
      resize: vertical;
    }
  }

  .aside__footer {
    display: flex;
    justify-content: space-between;

    .button {
      background-color: var(--color-background-button);
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      margin-left: 8px;
    }
  }
}

.timer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
}

@keyframes asideSlideIn {
  from {
    width: 0;
    transform: translateX(100%);
  }
  to {
    width: 300px;
    transform: translateX(0);
  }
}
</style>
