import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Country from '../views/Country.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/country/:countryCode',
    name: 'country',
    component: Country,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
