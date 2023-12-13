import createMockMethod, { queryList } from '.';
import { treeForEach, treeToList } from '../src/utils/dataFactory';

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
const permissionMap = Array.from({ length: roleList.length }).map(() => [
  {
    code: 'RolePermission',
    name: '职位与权限',
    has: true,
    children: [
      { code: 'RolePermission/addRole', name: '添加职位', has: false },
      { code: 'RolePermission/updateRole', name: '更新职位', has: false },
      { code: 'RolePermission/removeRole', name: '删除职位', has: false },
      { code: 'RolePermission/updatePermission', name: '更新权限', has: false },
    ],
  },
  {
    code: 'UserManagement',
    name: '用户管理',
    has: true,
    children: [
      { code: 'UserManagement/inviteUser', name: '邀请用户', has: false },
      { code: 'UserManagement/updateUser', name: '更新用户', has: false },
      { code: 'UserManagement/removeUser', name: '删除用户', has: false },
    ],
  },
]);
// 用户数据
const userList = Array.from({ length: 96 }).map((_v, index) => {
  const roleList = getRoleList(roleTree);
  const role = roleList[index % roleList.length];
  return {
    id: String(++index),
    name: role.name + index,
    avatar: `https://avatars.githubusercontent.com/u/${index}`,
    phone: String(18888888889 + index),
    email: 18888888889 + index + '@lisnote.com',
    role: role.name,
    roleId: role.id,
  };
});
userList.unshift({
  id: '0',
  name: `lisnote`,
  avatar: `https://avatars.githubusercontent.com/lisnote`,
  phone: '18888888888',
  email: '18888888888@lisnote.com',
  role: '系统管理员',
  roleId: '-1',
});
// mock 导出
export default createMockMethod(
  // 登录管理
  {
    url: '/user/login',
    response(this, { body: { phone, password } }) {
      const user = userList.find((user) => user.phone == phone);
      if (!user) {
        this.res.statusCode = 400;
        return { code: 40002 };
      } else if (password != '0192023a7bbd73250516f069df18b500') {
        this.res.statusCode = 400;
        return { code: 40003 };
      } else {
        return {
          code: 0,
          data: {
            ...user,
            token: user.roleId,
            permissions: treeToList(
              permissionMap[user.roleId === '-1' ? 0 : Number(user.roleId)],
            )
              .filter((permission) => user.roleId === '-1' || permission.has)
              .map((permission) => permission.code),
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
    response: ({ body: { roleId } }) => ({
      code: 0,
      data: permissionMap[roleId],
    }),
  },
  {
    url: '/user/updateRolePermission',
    response({ body: { roleId, permissions } }) {
      const permissionSet = new Set(permissions);
      treeForEach(permissionMap[roleId], (node) => {
        node.has = permissionSet.has(node.code);
      });
      return { code: 0 };
    },
  },
  // 成员管理
  {
    url: '/user/getUsers',
    response: ({ body: { page, limit } }) => ({
      code: 0,
      count: userList.length,
      data: queryList(userList, page, limit),
    }),
  },
  { url: '/user/inviteUsers', response: () => ({ code: 0 }) },
  { url: '/user/removeUsers', response: () => ({ code: 0 }) },
  { url: '/user/updateUser', response: () => ({ code: 0 }) },
);
