import { createMockMethod } from '.';

export default createMockMethod(
  {
    url: '/user/login',
    response: {
      code: 0,
      data: {
        id: '123456',
        name: 'lisnote',
        phone: 18888888888,
        token: '123456',
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
