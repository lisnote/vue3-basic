import { createApp } from 'vue';
import App from '@/App.vue';
import pinia from '@/store';
import ElementPlus from '@/plugins/ElementPlus';
import router from '@/router';
import '@/plugins/init';
import 'virtual:windi.css';
import '@/styles/global.scss';
import '@/styles/nprogress.scss';

createApp(App).use(pinia).use(ElementPlus).use(router).mount('#app');
