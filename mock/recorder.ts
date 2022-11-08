import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default createProxyMiddleware({
  target: 'https://api.github.com',
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(async (respBuffer, proxyRes, req) => {
    const data = respBuffer.toString('utf8');
    const dir = join(__dirname, 'data/recorder');
    const file = req.url.replace(/\?.*/, '').replaceAll('/', '_') + '.json';
    const jsonData = {};
    jsonData[req.method] = {};
    jsonData[req.method][req.url] = JSON.parse(data);
    mkdir(dir, { recursive: true }).then(() => {
      writeFile(join(dir, file), JSON.stringify(jsonData, null, 2), 'utf8');
    });
    return respBuffer;
  }),
});
