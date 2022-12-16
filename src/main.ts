import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import ElementPlus from './plugins/ElementPlus';
import LisUI from './components/LisUI';
import router from './router';

createApp(App).use(pinia).use(ElementPlus).use(LisUI).use(router).mount('#app');
