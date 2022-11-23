/**
 * 移除对象中值为 '', null, undefined 的属性
 */
import type { AxiosRequestConfig } from 'axios';

import { isObject, isArray } from '@/utils/types';

export default function (config: AxiosRequestConfig) {
  emptyFilter(config.data);
  return config;
}

const emptyValues: Array<unknown> = ['', null, undefined];
function emptyFilter(value: unknown) {
  if (isArray(value)) {
    (value as Array<unknown>).forEach(emptyFilter);
  } else if (isObject(value)) {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      if (isArray(v) || isObject(v)) {
        emptyFilter(v);
      } else if (emptyValues.includes(v)) {
        delete (value as Record<string, unknown>)[k];
      }
    });
  }
}
