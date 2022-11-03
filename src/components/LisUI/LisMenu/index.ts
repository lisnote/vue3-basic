import index from './index.vue';
import { cloneDeepWith } from 'lodash-es';
import { isObject } from '@/utils/types';
import router from '@/router';

import type { RouteRecordRaw } from 'vue-router';

export default index;

export interface LisMenuData {
  index: string;
  title: string;
  children?: LisMenuData[];
  onClick?(...args: unknown[]): unknown;
}

export function MenuRouteAdaptor(data: RouteRecordRaw[]): LisMenuData[] {
  return cloneDeepWith(data, (value) => {
    if (isObject(value)) {
      return {
        index: value.path,
        title: value.title,
        children: MenuRouteAdaptor(value.children),
        onClick: () => !(value.children?.length > 0) && router.push(value.path),
      };
    }
  });
}
