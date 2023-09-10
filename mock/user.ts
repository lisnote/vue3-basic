import { createMockMethod } from '.';

export default createMockMethod(
  {
    url: '/user/login',
    response: {
      code: 0,
      data: {
        id: '123456',
        name: 'admin',
        token: '123456',
        avatar: 'https://avatars.githubusercontent.com/lisnote',
        permissionList: [
          'permissionAdd',
          'permissionSelect',
          'permissionEdit',
          'permissionDelete',
        ],
      },
    },
  },
  {
    url: '/user/logout',
    response: {
      code: 0,
    },
  },
);
