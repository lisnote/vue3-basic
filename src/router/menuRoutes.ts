import type { RouteRecordRaw } from 'vue-router';

/**
 * 菜单路由信息
 */
export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/Dashboard',
    meta: { title: '首页' },
    component: () => import('@/views/Home'),
  },
  {
    path: '/Components',
    meta: { title: '组件' },
    children: [
      {
        path: '/Components/Form',
        meta: { title: '表单' },
        component: () => import('@/views/Form'),
      },
    ],
  },
  {
    path: '/Features',
    meta: {
      title: '功能',
    },
    children: [
      {
        path: '/Features/ScanningCode',
        meta: { title: '扫码' },
        component: () => import('@/views/ScanningCode'),
      },
      {
        path: '/Features/VideoPlayer',
        meta: { title: '视频播放' },
        component: () => import('@/views/PlayVideo'),
      },
      {
        path: '/Features/Theme',
        meta: { title: '主题' },
        component: () => import('@/views/Theme'),
      },
    ],
  },
  {
    path: '/System',
    meta: { title: '系统管理' },
    children: [
      {
        path: '/System/About',
        meta: { title: '关于' },
        component: () => import('@/views/About'),
      },
    ],
  },
];
