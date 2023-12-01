import { createApp } from 'vue';
import App from '@/App.vue';
import pinia from '@/store';
import ElementPlus from '@/plugins/ElementPlus';
import router from '@/router';
import '@/plugins/init';
import 'virtual:uno.css';
import '@/styles/global.scss';

createApp(App).use(pinia).use(ElementPlus).use(router).mount('#app');
