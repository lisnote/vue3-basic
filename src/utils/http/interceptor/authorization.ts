/**
 * 后端请求携带token
 */
import { useUserStore } from '@/store';
import type { AxiosRequestConfig } from 'axios';

const userStore = useUserStore();
export default function (config: AxiosRequestConfig) {
  if (userStore.token && config.baseURL === import.meta.env.APP_API) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${userStore.token}`,
    };
  }
  return config;
}
