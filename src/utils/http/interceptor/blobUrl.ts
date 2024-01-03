import type { AxiosRequestConfig } from 'axios';

/** 兼容Blob Url请求 */
export default function (config: AxiosRequestConfig) {
  if (/^blob:https?:\/\//.test(config.url ?? '')) {
    config.baseURL = '';
  }
  return config;
}
