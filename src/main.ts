import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import axios from './plugins/axios';

const app = createApp(App);
app.use(router);
app.use(axios, {
  baseUrl: import.meta.env.VITE_API_URL,
});
app.mount('#app');
