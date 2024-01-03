/**
 * 移除对象中值为 '', null, undefined 的属性
 */
import type { AxiosRequestConfig } from 'axios';

import { isObject, isArray } from '@/utils/types';

export default function (config: AxiosRequestConfig) {
  config.params = emptyFilter(JSON.parse(JSON.stringify(config.params ?? {})));
  config.data = emptyFilter(JSON.parse(JSON.stringify(config.data ?? {})));
  return config;
}

const emptyValues = ['', null, undefined];
function emptyFilter<T>(value: T) {
  if (isArray(value)) {
    value.forEach(emptyFilter);
  } else if (isObject(value)) {
    Object.entries(value).forEach(([k, v]) => {
      if (isArray(v) || isObject(v)) {
        emptyFilter(v);
      } else if (emptyValues.includes(v)) {
        delete value[k as keyof typeof value];
      }
    });
  }
  return value;
}
