import { createMockMethod, queryList } from '.';
import { cloneDeep } from 'lodash-es';
import { treeToList } from '.';

// 角色数据
type Role = { id: string; name: string; children?: Role[] };
const roleTree: Role[] = [
  {
    id: '0',
    name: '总经理',
    children: [
      { id: '1', name: '实习经理' },
      {
        id: '2',
        name: '技术总监',
        children: [{ id: '3', name: '工程师' }],
      },
      {
        id: '4',
        name: '销售主管',
        children: [{ id: '5', name: '销售员' }],
      },
      {
        id: '6',
        name: '产品经理',
        children: [
          { id: '7', name: '设计师' },
          { id: '8', name: '调查员' },
        ],
      },
    ],
  },
];
function getRoleList(roleTree: Role[], list: Role[] = []) {
  roleTree?.forEach((role) => {
    list.push(role);
    if (role.children?.length) getRoleList(role.children, list);
  });
  return list;
}
const roleList = treeToList(roleTree);
// 权限数据
const permission = [
  {
    code: 'RolePermission',
    name: '职位与权限',
    has: false,
    children: [
      { code: 'RolePermission/view', name: '查看', has: false },
      { code: 'RolePermission/remove', name: '删除', has: false },
      { code: 'RolePermission/add', name: '添加', has: false },
      { code: 'RolePermission/update', name: '更新', has: false },
    ],
  },
  {
    code: 'UserManagement',
    name: '用户管理',
    has: false,
    children: [
      { code: 'UserManagement/view', name: '查看', has: false },
      { code: 'UserManagement/remove', name: '删除', has: false },
      { code: 'UserManagement/add', name: '添加', has: false },
      { code: 'UserManagement/update', name: '更新', has: false },
    ],
  },
  {
    code: 'LicenseManagement',
    name: '许可证管理',
    has: false,
    children: [
      { code: 'LicenseManagement/view', name: '查看', has: false },
      { code: 'LicenseManagement/update', name: '更新', has: false },
    ],
  },
];
const permissionMap = {
  ...Array.from({ length: roleList.length }).map(() => cloneDeep(permission)),
};
// 用户数据
const userList = Array.from({ length: 96 }).map((_v, index) => {
  const roleList = getRoleList(roleTree);
  const role = roleList[(Math.random() * roleList.length) | 0];
  return {
    id: String(++index),
    avatar: `https://avatars.githubusercontent.com/u/${++index}`,
    name: `用户${index}`,
    phone: String(18888888889 + index),
    email: 18888888889 + index + '@lisnote.com',
    role: role.name,
    roleId: role.id,
  };
});
// mock 导出
export default createMockMethod(
  // 登录管理
  {
    url: '/user/login',
    response(this, { body: { phone, password } }) {
      if (phone != '18888888888') {
        this.res.statusCode = 400;
        return { code: 40002 };
      } else if (password != '0192023a7bbd73250516f069df18b500') {
        this.res.statusCode = 400;
        return { code: 40003 };
      } else {
        return {
          code: 0,
          data: {
            id: '0',
            name: 'admin',
            phone: '18888888888',
            token: '123456',
            avatar: 'https://avatars.githubusercontent.com/lisnote',
            permissionList: [
              'permissionAdd',
              'permissionSelect',
              'permissionEdit',
              'permissionDelete',
            ],
          },
        };
      }
    },
  },
  { url: '/user/signup', response: () => ({ code: 0 }) },
  { url: '/user/resetPassword', response: () => ({ code: 0 }) },
  { url: '/user/logout', response: () => ({ code: 0 }) },
  // 角色权限
  { url: '/user/getRoleTree', response: () => ({ code: 0, data: roleTree }) },
  { url: '/user/removeRoles', response: () => ({ code: 0 }) },
  { url: '/user/addRole', response: () => ({ code: 0 }) },
  { url: '/user/updateRole', response: () => ({ code: 0 }) },
  {
    url: '/user/getRolePermission',
    response: ({ body: { id } }) => ({ code: 0, data: permissionMap[id] }),
  },
  { url: '/user/updateRolePermission', response: () => ({ code: 0 }) },
  // 成员管理
  {
    url: '/user/getUserList',
    response: ({ body: { page, limit } }) => ({
      code: 0,
      count: userList.length,
      data: queryList(userList, page, limit),
    }),
  },
  { url: '/user/removeUsers', response: () => ({ code: 0 }) },
  { url: '/user/addUser', response: () => ({ code: 0 }) },
  { url: '/user/updateUser', response: () => ({ code: 0 }) },
);
