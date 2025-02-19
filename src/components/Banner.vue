<script setup>
import { ref } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';

const isDarkTheme = ref(false);
</script>

<template>
  <div class="tasks-banner">
    <div class="tasks-banner__day">
      <h2 class="title">Мой день</h2>
      <div class="day">воскресенье, 11 февраля</div>
    </div>
    <ToggleSwitch v-model="checked" class="theme-switch">
      <template #handle="{ checked }">
        <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
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
