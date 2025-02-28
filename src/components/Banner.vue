<script setup>
import { ref, watch, onMounted } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
import { darkStyle, lightStyle } from '@/utils.js';
import moment from 'moment';

const isDarkTheme = ref(false);

const applyTheme = (theme) => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};

watch(isDarkTheme, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light');
  applyTheme(newValue ? darkStyle : lightStyle);
});

onMounted(() => {
  //  Получаем текущую тему из localStorage
  const theme = localStorage.getItem('theme');
  // если приходит light то тема светлая иначе темная
  isDarkTheme.value = theme === 'light' ? false : true;

  // Применяем тему
  applyTheme(isDarkTheme.value ? darkStyle : lightStyle);
});
</script>

<template>
  <div class="tasks-banner">
    <div class="tasks-banner__day">
      <h2 class="title">Мой день</h2>
      <div class="day">{{ moment().locale('ru').format('DD MMMM YYYY, dddd') }}</div>
    </div>
    <ToggleSwitch v-model="isDarkTheme" class="theme-switch">
      <template #handle="{ isDarkTheme }">
        <i :class="['!text-xs pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]" />
      </template>
    </ToggleSwitch>
  </div>
</template>

<style lang="scss" scoped>
.tasks-banner {
  height: 100px;
  width: 100%;
  background-image: url('/src/assets/banner.png');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__day {
    margin-left: 20px;
  }
}

.theme-switch {
  margin-right: 20px;
}
</style>
