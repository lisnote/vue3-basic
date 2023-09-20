import { createRouter, createWebHashHistory } from 'vue-router';
import { menuRoutes } from './menuRoutes';
import { useUserStore } from '@/store';
import nProgress from 'nprogress';

const loginPath = '/Login';
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
      path: loginPath,
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

router.beforeEach(function (to, _from, next) {
  nProgress.start();
  const userStore = useUserStore();
  if (to.path !== loginPath && !userStore.token) {
    // 未登录跳转到登录界面
    next(loginPath);
  } else if (to.path === loginPath && userStore.token) {
    // 已登录跳转到首页
    next('/');
  } else {
    // 普通跳转
    next();
  }
});
router.afterEach(() => {
  nProgress.done();
});
export { router as default };
export * from './menuRoutes';
