import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

/**
 * 菜单路由信息
 */
const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    title: '首页',
    component: () => import('@/views/Home'),
  },
  {
    path: '/form',
    title: '表单',
    component: () => import('@/views/Form'),
  },
  {
    path: '/ScanningCode',
    title: '扫码',
    component: () => import('@/views/ScanningCode'),
  },
  {
    path: '/theme',
    title: '主题',
    component: () => import('@/views/Theme'),
  },
  {
    path: '/About',
    title: '关于',
    component: () => import('@/views/About'),
  },
];

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

export { router as default, menuRoutes };
