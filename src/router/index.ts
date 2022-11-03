import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const menuRouters: RouteRecordRaw[] = [
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
  routes: menuRouters,
});

export { router as default, menuRouters };
