<script setup>
import { ref } from 'vue';
import Home from '../components/HelloWorld.vue';

const tasks = ref([]);
const inputValue = ref('');

const save = () => {
    tasks.value.push({ title: inputValue.value });

    inputValue.value = '';
};
</script>

<template>
    <div class="wraper-tasks">
        <div class="tasks-banner">
            <div class="tasks-banner__day">
                <h2 class="title">Мой день</h2>
                <div class="day">воскресенье, 10 февраля</div>
            </div>
            <div class="tasks-banner__buttons">
                <button></button>
                <button></button>
            </div>
        </div>
        <div class="tasks-action">
            <div class="tasks">
                <h2 class="tasks-title">Задачи</h2>
                <div class="task" v-for="task in tasks"><input type="checkbox" class="task-checkbox" />{{ task.title }}</div>
            </div>
            <input class="task-input" v-model="inputValue" @keydown.enter="save" type="text" placeholder="Введите задачу" />
        </div>
    </div>
</template>
<style scoped>
.wraper-tasks {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.tasks-action {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
}
.tasks {
    width: 100%;
    padding: 20px;
    height: 650px;
    overflow: auto;
}
.task-input {
    width: 90%;
    height: 40px;
    padding-left: 10px;
}
.tasks-title {
    text-align: center;
}
.tasks-banner {
    height: 200px;
    width: 100%;
    background-image: url('/src/assets/banner.png');
    background-repeat: no-repeat;
    background-position: center;
}
.task-checkbox {
    margin-right: 10px;
}
.tasks-banner {
    display: flex;
    align-items: end;
    padding: 50px;
    justify-content: space-between;
}
.tasks-banner__buttons {
    display: flex;
    gap: 10px;
}
button {
    width: 25px;
    height: 25px;
}
</style>
