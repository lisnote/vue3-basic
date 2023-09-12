import { createMockMethod } from '.';

export default createMockMethod(
  {
    url: '/user/login',
    rawResponse(this, req, res) {
      res.setHeader('Content-Type', 'application/json');
      this.parseJson().then(({ phone, password }) => {
        if (phone != '18888888888') {
          res.statusCode = 400;
          res.end(JSON.stringify({ code: 40002 }));
        } else if (password != '0192023a7bbd73250516f069df18b500') {
          res.statusCode = 400;
          res.end(JSON.stringify({ code: 40003 }));
        } else {
          res.end(
            JSON.stringify({
              code: 0,
              data: {
                id: '123456',
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
            }),
          );
        }
      });
    },
  },
  {
    url: '/user/signup',
    response: () => ({ code: 0 }),
  },
  {
    url: '/user/resetPassword',
    response: () => ({ code: 0 }),
  },
  {
    url: '/user/logout',
    response: () => ({ code: 0 }),
  },
);
