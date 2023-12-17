import {
  RouteLocationNormalized,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import { menuRoutes } from './menuRoutes';
import { useUserStore } from '@/store';
import nProgress from 'nprogress';
import { notPermission } from '@/hooks/usePermission';
import { isString } from '@/utils/types';
import { $t, t } from '@/locales';
import { useWatchMessage } from '@/hooks/useI18n';

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
      meta: { title: $t('menus.login') },
    },
    {
      path: '/403',
      component: () => import('@/views/Error/403.vue'),
      meta: { title: $t('menus.403') },
    },
    {
      path: '/:path(.*)',
      component: () => import('@/views/Error/404.vue'),
      meta: { title: $t('menus.404') },
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
  } else if (
    isString(to.meta.permission) &&
    notPermission(to.meta.permission)
  ) {
    // 无权跳转
    next('/403');
  } else {
    // 普通跳转
    next();
  }
});
function updateTitle(route: RouteLocationNormalized) {
  document.title =
    import.meta.env.APP_NAME + ' | ' + t((route.meta.title ?? '') as string);
}
useWatchMessage(() => {
  updateTitle(router.currentRoute.value);
});
router.afterEach((to) => {
  updateTitle(to);
  nProgress.done();
});

export { router as default };
export * from './menuRoutes';
