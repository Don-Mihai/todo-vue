<template>
  <div class="progress-container">
    {{ store.count }}
    <div class="progress-bar-background">
      <div class="progress-bar-fill" :style="{ width: 0 + '%' }"></div>
      <div
        v-for="(checkpoint, index) in checkpoints"
        :key="index"
        class="checkpoint"
        :class="{ active: checkpoint.active }"
        :style="{
          left: `${
            index *
            (100 / (checkpoints.length > 1 ? checkpoints.length - 1 : 1))
          }%`,
        }"
        @click.stop="toggleCheckpoint(index)"
        @mouseenter="showTooltip(index)"
        @mouseleave="hideTooltip"
      >
        <div v-if="tooltipIndex === index" class="tooltip">
          {{ checkpoint.description }}
        </div>
      </div>
    </div>
    <button @click="addNewCheckpoint">Добавить точку</button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { gsap } from "gsap";
import { reactive as reactiveMobx } from "@vue/reactivity";
import { store as mobxStore } from "../mobx/store";

const store = reactiveMobx(mobxStore);

const checkpoints = reactive([]);
const tooltipIndex = ref(-1);

const addNewCheckpoint = () => {
  checkpoints.push({
    active: false,
    description: `Задача ${checkpoints.length + 1}`,
  });
};

const toggleCheckpoint = (index) => {
  checkpoints[index].active = !checkpoints[index].active;
  checkpoints.forEach((checkpoint, i) => {
    checkpoint.active = i <= index;
  });

  // GSAP animation for filling the progress bar
  gsap.to(".progress-bar-fill", {
    width: `${
      index * (100 / (checkpoints.length > 1 ? checkpoints.length - 1 : 1))
    }%`,
    duration: 0.5,
    ease: "power1.out",
  });
};

const showTooltip = (index) => {
  tooltipIndex.value = index;
};

const hideTooltip = () => {
  tooltipIndex.value = -1;
};
</script>

<style scoped>
.progress-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar-background {
  position: relative;
  width: 100%;
  height: 3px;
  background-color: #eee;
  border-radius: 10px;
  /* overflow: hidden; */
}

.progress-bar-fill {
  position: absolute;
  height: 3px;
  /* top: 8px; */
  background-color: #4caf50;
  width: 0;
  border-radius: 10px;
  transition: width 0.5s ease-out;
}

.checkpoint {
  position: absolute;
  bottom: 50%;
  transform: translate(-50%, 50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkpoint.active {
  background-color: #4caf50;
}

.tooltip {
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #367c39;
}
</style>
