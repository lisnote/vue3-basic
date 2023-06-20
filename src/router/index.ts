import { createRouter, createWebHashHistory } from 'vue-router';
import { menuRoutes } from './menuRoutes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout'),
      children: [
        {
          path: '/',
          redirect: '/Dashboard',
        },
        ...menuRoutes,
      ],
    },
    {
      path: '/Login',
      component: () => import('@/views/Login'),
    },
  ],
});

export { router as default };
export * from './menuRoutes';
