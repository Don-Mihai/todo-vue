import { createRouter, createWebHistory } from 'vue-router';
import AllTasks from '../views/AllTasks.vue';
import PlanedTasks from '../views/PlanedTasks.vue';
import CompletedTasks from '../views/CompletedTasks.vue';
import Important from '@/views/Important.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AllTasks,
    },
    {
      path: '/uncomplete',
      component: PlanedTasks,
    },
    {
      path: '/complete',
      component: CompletedTasks,
    },
    {
      path: '/important',
      component: Important,
    },
  ],
});

export default router;
