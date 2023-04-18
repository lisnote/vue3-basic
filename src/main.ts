import { createApp } from 'vue';
import App from '@/App.vue';
import pinia from '@/store';
import ElementPlus from '@/plugins/ElementPlus';
import router from '@/router';
import init from '@/plugins/init';

import '@/styles/default.scss';

createApp(App).use(pinia).use(ElementPlus).use(router).use(init).mount('#app');
