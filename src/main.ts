import { createApp } from 'vue';
import App from './App.vue';
import LisUI from './components/LisUI';
import router from './router';
import ElementPlus from './plugins/ElementPlus';

createApp(App).use(ElementPlus).use(LisUI).use(router).mount('#app');
