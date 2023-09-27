import http from '@/utils/http';
import { AxiosRequestConfig } from 'axios';

// 登录管理 --------------------------------------------------
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

// 角色权限 --------------------------------------------------------
// 获取角色树
export type Role = { id: string; name: string; children?: Role[] };
export type Permission = {
  code: string;
  has: boolean;
  children?: Permission[];
};
export async function getRoleTree(
  config?: AxiosRequestConfig,
): Promise<{ data: { data: Role[] } }> {
  return http.post('/user/getRoleTree', {}, config);
}
// 移除角色
export async function removeRoles(data: string[], config?: AxiosRequestConfig) {
  return http.post('/user/removeRoles', data, config);
}
// 添加角色
export async function addRole(
  data: { pid: string; name: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/addRole', data, config);
}
// 更新角色
export async function updateRoles(
  data: { id: string; name: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/removeRoles', data, config);
}
// 获取角色权限
export async function getRolePermission(
  data: { id: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/getRolePermission', data, config);
}
// 更新角色权限
export async function updateRolePermission(
  data: Permission,
  config?: AxiosRequestConfig,
) {
  return http.post('/user/updateRolePermission', data, config);
}

// 用户管理 --------------------------------------------------------
// 获取用户列表
export async function getUserList(
  data: { page: number; limit: number },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/getUserList', data, config);
}
