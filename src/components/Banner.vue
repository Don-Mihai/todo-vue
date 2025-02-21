<script setup>
import { ref, watch } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
import { darkStyle, lightStyle } from '@/utils.js';

const isDarkTheme = ref(false);

const applyTheme = (theme) => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};

watch(isDarkTheme, (newValue) => {
  applyTheme(newValue ? darkStyle : lightStyle);
});
</script>

<template>
  <div class="tasks-banner">
    <div class="tasks-banner__day">
      <h2 class="title">Мой день</h2>
      <div class="day">воскресенье, 11 февраля</div>
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
