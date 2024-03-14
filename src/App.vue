<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrap">
    <nav>
        <RouterLink to="/">Все задачи</RouterLink>
        <RouterLink to="/new">Запланированные</RouterLink>
        <RouterLink to="/complete">Завершенные</RouterLink>
      </nav>
      <RouterView />
  </div>
 
</template>

<style scoped>
.wrap {
  display: flex;
  /* height: 100vh; */
}

</style>
