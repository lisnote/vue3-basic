import { createMockMethod } from '.';

export default createMockMethod({
  url: '/basic/sendSmsCode',
  // name 不为 admin 时抛错: 用户不存在
  rawResponse(req, res) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      if (data.name !== 'admin') {
        res.statusCode = 404;
        res.end(JSON.stringify({ code: 40002, message: 'User not found.' }));
      } else {
        res.end(JSON.stringify({ code: 0 }));
      }
    });
  },
});
