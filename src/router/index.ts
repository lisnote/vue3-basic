import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    title: '首页',
    component: () => import('@/views/Home'),
  },
  {
    path: '/about',
    title: '关于',
    component: () => import('@/views/About'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: menuRoutes,
});

export { router as default, menuRoutes };
