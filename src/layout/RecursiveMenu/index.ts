/**
 * 菜单组件
 * 属性 data 接收一个 RecursiveMenuData 类型的数据
 * 生成菜单栏, 兼容 el-menu 属性
 */
import RecursiveMenu from './RecursiveMenu.vue';
import { cloneDeepWith } from 'lodash-es';
import { is } from '@/utils/types';
import router from '@/router';

import type { RouteRecordRaw } from 'vue-router';

export default RecursiveMenu;

export interface RecursiveMenuData {
  index: string;
  title: string;
  icon: string;
  permission: string;
  children?: RecursiveMenuData[];
  onClick?(...args: unknown[]): unknown;
}

/**
 * 将 RouteRecordRow[] 类型的数据转换为 RecursiveMenuData[] 类型的数据
 */
export function MenuRouteAdaptor(data: RouteRecordRaw[]): RecursiveMenuData[] {
  return cloneDeepWith(data, (value) => {
    if (is<RouteRecordRaw>(value, 'Object')) {
      return {
        index: value.path,
        title: value.meta?.title,
        icon: value.meta?.icon,
        permission: value.meta?.permission,
        children: MenuRouteAdaptor(value.children ?? []),
        onClick: () => !value.children?.length && router.push(value.path),
      };
    }
  });
}
