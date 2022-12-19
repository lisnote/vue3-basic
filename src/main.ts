import { createApp } from 'vue';
import App from '@/App.vue';
import pinia from '@/store';
import ElementPlus from '@/plugins/ElementPlus';
import LisUI from '@/components/LisUI';
import router from '@/router';
import init from '@/plugins/init';

createApp(App)
  .use(pinia)
  .use(ElementPlus)
  .use(LisUI)
  .use(router)
  .use(init)
  .mount('#app');
