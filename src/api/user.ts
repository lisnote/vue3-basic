import http from '@/utils/http';
import { AxiosRequestConfig } from 'axios';

// 登录
export async function login(
  data: { phone: string; password: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/login', data, config);
}

// 注册
export async function signup(
  data: { phone: string; password: string; smsCode: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/signup', data, config);
}

// 重置密码
export async function resetPassword(
  data: { phone: string; password: string; smsCode: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/resetPassword', data, config);
}

// 登出
export async function logout(config?: AxiosRequestConfig) {
  return http.post('/user/logout', {}, config);
}
