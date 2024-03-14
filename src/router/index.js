import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AllTasks from '../views/AllTasks.vue';
import NextTasks from '../views/NextTasks.vue';
import ReadyTasks from '../views/ReadyTasks.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/all',
            name: 'alltasks',
            component: AllTasks,
        },
        {
            path: '/next',
            name: 'nexttasks',
            component: NextTasks,
        },
        {
            path: '/ready',
            name: 'readytasks',
            component: ReadyTasks,
        },
    ],
});

export default router;
