<script setup>
import { ref } from 'vue';

const tasks = ref([]);
const inputValue = ref('');

const save = () => {
    tasks.value.push({ title: inputValue.value });

    inputValue.value = '';
};
</script>

<template>
    <div class="wraper">
        <div class="tasks">
            <h2>Задачи</h2>

            <div v-for="task in tasks">
                {{ task.title }}
            </div>

            <div v-if="false"></div>
        </div>
        <input v-model="inputValue" @keydown.enter="save" type="text" />
    </div>
</template>
<style scoped>
/* .tasks {
  height: 100%;
} */
</style>
