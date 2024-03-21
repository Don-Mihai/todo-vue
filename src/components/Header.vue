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
      <RouterLink to="/progress" class="nav-li">Прогресс</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.wrap-header {
  width: 280px;
  height: 100vh;
  background-color: #fff;
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
}
.profile__name {
  color: #000;
}
.nav-li {
  text-decoration: none;
  color: #000;
  font-size: 18px;
  padding: 10px 0;
  display: block;
  padding-left: 20px;
  transition: all 0.5s;
}
.nav-li:hover {
  background-color: #1d1b1b24;
}
.router-link-active {
  background-color: #1d1b1b24;
}
</style>
