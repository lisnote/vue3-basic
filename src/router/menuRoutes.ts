import type { RouteRecordRaw } from 'vue-router';

/**
 * 菜单路由信息
 */
export const menuRoutes: RouteRecordRaw[] = [
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
    path: '/PlayVideo',
    title: '视频播放',
    component: () => import('@/views/PlayVideo'),
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
