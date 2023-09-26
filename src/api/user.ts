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

// 获取角色树
export async function getRoleTree(config?: AxiosRequestConfig) {
  return http.post('/user/getRoleTree', config);
}

// 获取用户列表
export async function getUserList(
  data: { page: number; limit: number },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/getUserList', data, config);
}
