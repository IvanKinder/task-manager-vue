import { createRouter, createWebHistory, type RouterHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import TasksList from '../pages/TasksList.vue';


const routes = [
    { path: '/', component: MainPage },
    { path: '/tasks', component: TasksList }
];

const router = createRouter({ history: createWebHistory(), routes, });

export default router;