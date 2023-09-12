import { createMockMethod } from '.';

export default createMockMethod({
  url: '/basic/sendSmsCode',
  // phone 不为 18888888888 时抛错: 用户不存在
  rawResponse(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      if (data.phone !== '18888888888') {
        res.statusCode = 404;
        res.end(JSON.stringify({ code: 40002, message: 'User not found.' }));
      } else {
        res.end(JSON.stringify({ code: 0 }));
      }
    });
  },
});
