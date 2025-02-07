import { createRouter, createWebHistory } from 'vue-router';
import AllTasks from '../views/AllTasks.vue';
import NextTasks from '../views/NextTasks.vue';
import ReadyTasks from '../views/ReadyTasks.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AllTasks,
    },
    {
      path: '/uncomplete',
      component: NextTasks,
    },
    {
      path: '/complete',
      component: ReadyTasks,
    },
  ],
});

export default router;
