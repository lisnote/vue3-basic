import http from '@/utils/http';
import { AxiosRequestConfig } from 'axios';

// 登录
export async function login(
  data: { name: string; password: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/login', data, config);
}

// 重置密码
export async function resetPassword(
  data: { name: string; password: string; smsCode: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/resetPassword', data, config);
}

// 登出
export async function logout(
  data: { token: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/logout', data, config);
}
