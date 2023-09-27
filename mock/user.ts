import { createMockMethod, queryList } from '.';

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
export default createMockMethod(
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
  // 角色与权限
  { url: '/user/getRoleTree', response: () => ({ code: 0, data: roleTree }) },
  { url: '/user/removeRoles', response: () => ({ code: 0 }) },
  { url: '/user/addRole', response: () => ({ code: 0 }) },
  { url: '/user/updateRole', response: () => ({ code: 0 }) },
  { url: '/user/getPermission', response: () => ({ code: 0, data: [] }) },
  { url: '/user/updatePermission', response: () => ({ code: 0 }) },
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
