import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CountryView from '../views/CountryView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/country/:countryCode',
    name: 'country',
    component: CountryView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
