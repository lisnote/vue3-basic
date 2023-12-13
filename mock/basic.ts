import createMockMethod from '.';

export default createMockMethod({
  url: '/basic/sendSmsCode',
  response: () => ({ code: 0 }),
});
