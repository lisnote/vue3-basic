import http from '@/utils/http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

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
export type Role = { id: string; name: string; pid: string; children?: Role[] };
export type Permission = {
  name: string;
  code: string;
  has: boolean;
  children?: Permission[];
  indeterminate?: boolean;
  parent?: Permission;
};
// 获取角色树
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
  data: { name: string; pid?: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/addRole', data, config);
}
// 更新角色
export async function updateRole(
  data: { id: string; name: string; pid?: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/updateRole', data, config);
}
// 获取角色权限
export async function getRolePermission(
  data: { roleId: string },
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<{ data: Permission[] }>> {
  return http.post('/user/getRolePermission', data, config);
}
// 更新角色权限
export async function updateRolePermission(
  data: { roleId: string; permissions: string[] },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/updateRolePermission', data, config);
}

// 用户管理 --------------------------------------------------------
export type User = {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  roleId: string;
};
// 获取用户列表
export async function getUsers(
  data: { page: number; limit: number; search: string },
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<{ data: User[]; count: number }>> {
  return http.post('/user/getUsers', data, config);
}
// 邀请用户
export async function inviteUser(
  data: { phone: string; roleId: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/inviteUsers', data, config);
}
// 移除用户
export async function removeUsers(data: string[], config?: AxiosRequestConfig) {
  return http.post('/user/removeUsers', data, config);
}
// 更新用户
export async function updateUser(
  data: { phone: string; roleId: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/user/updateUser', data, config);
}
