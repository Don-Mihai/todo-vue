<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="wrap-header">
    <div class="profile">
      <img src="/src/assets/image.png" alt="" class="profile__logo" />
      <div class="profile__name">My Profile</div>
    </div>
    <nav class="nav">
      <RouterLink to="/" class="nav-li">Все задачи</RouterLink>
      <RouterLink to="/uncomplete" class="nav-li">Запланированные</RouterLink>
      <RouterLink to="/complete" class="nav-li">Завершенные</RouterLink>
      <RouterLink to="/important" class="nav-li">Важные</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.wrap-header {
  width: 280px;
  height: 100vh;
  background-color: var(--color-background);
  padding: 2rem 0;
}
.nav {
  display: flex;
  flex-direction: column;
}
.profile {
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
  padding-left: 20px;
}
.profile__logo {
  width: 60px;
  height: 60px;
  transition: all 0.15s;
}

.profile__logo:active {
  transform: scale(0.9);
}
.profile__name {
  color: var(--color-text);
}
.nav-li {
  text-decoration: none;
  color: var(--color-text);
  font-size: 18px;
  padding: 10px 0;
  display: block;
  padding-left: 20px;
  transition: all 0.5s;
}
.nav-li:hover {
  background-color: var(--color-background-secondary);
  transform: scale(1.03);
}
.router-link-active {
  background-color: var(--color-background-secondary);
}
</style>
