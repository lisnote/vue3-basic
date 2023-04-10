/**
 * 兼容Blob Url请求
 */
import type { AxiosRequestConfig } from 'axios';

export default function (config: AxiosRequestConfig) {
  if (/^blob:https?:\/\//.test(config.url ?? '')) {
    config.baseURL = '';
  }
  return config;
}
