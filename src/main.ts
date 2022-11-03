import { createApp } from 'vue';
import App from './App.vue';
import LisUI from './components/LisUI';
import router from './router';

createApp(App).use(LisUI).use(router).mount('#app');
