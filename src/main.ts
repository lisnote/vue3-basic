import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import ElementPlus from './plugins/ElementPlus';
import LisUI from './components/LisUI';
import router from './router';

createApp(App)
  .use(createPinia())
  .use(ElementPlus)
  .use(LisUI)
  .use(router)
  .mount('#app');
