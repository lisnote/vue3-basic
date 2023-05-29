import { createRouter, createWebHashHistory } from 'vue-router';
import { menuRoutes } from './menuRoutes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout'),
      children: menuRoutes,
    },
  ],
});

export { router as default };
export * from './menuRoutes';
