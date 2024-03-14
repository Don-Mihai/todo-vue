<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './nav/Header.vue';
import Home from './components/HelloWorld.vue';
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
