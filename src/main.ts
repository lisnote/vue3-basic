import { createApp } from 'vue';
import App from '@/App.vue';
import pinia from '@/store';
import ElementPlus from '@/plugins/ElementPlus';
import { MotionPlugin } from '@vueuse/motion';
import router from '@/router';
import '@/plugins/init';
import 'virtual:windi.css';
import '@/styles/normalize.css';

createApp(App)
  .use(pinia)
  .use(ElementPlus)
  .use(MotionPlugin)
  .use(router)
  .mount('#app');
