<template>
  <div class="tasks-banner">
    <div class="tasks-banner__day">
      <h2 class="title">Мой день</h2>
      <div class="day">воскресенье, 11 февраля</div>
    </div>
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
  transition: all 0.3s ease-in-out;

  &__day {
    margin-left: 20px;
  }

  &:hover {
    height: 150px;
  }
}
</style>
