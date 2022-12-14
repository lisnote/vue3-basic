import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/form',
    title: '表单',
    component: () => import('@/views/Form'),
  },
  {
    path: '/theme',
    title: '主题',
    component: () => import('@/views/Theme'),
  },
  {
    path: '/',
    title: '关于',
    component: () => import('@/views/About'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: menuRoutes,
});

export { router as default, menuRoutes };
