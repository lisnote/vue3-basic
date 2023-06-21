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
    {
      path: '/403',
      component: () => import('@/views/Error/403.vue'),
    },
    {
      path: '/:path(.*)',
      component: () => import('@/views/Error/404.vue'),
    },
  ],
});

export { router as default };
export * from './menuRoutes';
