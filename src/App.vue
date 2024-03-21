<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <div class="wrap">
    <Header></Header>
    <RouterView />
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  /* height: 100vh; */
}
</style>
