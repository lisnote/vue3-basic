import { createApp } from 'vue';
import App from '@/App.vue';
import pinia from '@/store';
import ElementPlus from '@/plugins/ElementPlus';
import { MotionPlugin } from '@vueuse/motion';
import router from '@/router';
import init from '@/plugins/init';

import 'virtual:windi.css';

createApp(App)
  .use(pinia)
  .use(ElementPlus)
  .use(MotionPlugin)
  .use(router)
  .use(init)
  .mount('#app');
