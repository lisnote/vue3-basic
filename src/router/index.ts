import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
    },
    {
      path: '/about',
      component: () => import('@/views/About'),
    },
  ],
});

export default router;
