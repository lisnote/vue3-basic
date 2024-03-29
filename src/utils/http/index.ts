/**
 * 创建 axios 实例, 绑定中间件并作为默认导出
 * 导出所有 transformResponse 相关方法
 */
import axios from 'axios';
import useInterceptors from './interceptor';
import MockAdapter from './MockAdapter';

const http = axios.create({
  baseURL: import.meta.env.APP_API,
  timeout: 5000,
  responseType: 'blob',
  formSerializer: { indexes: null },
  paramsSerializer: { indexes: null, encode: encodeURI },
});
useInterceptors(http);

// 生产环境 mock
import.meta.env.PROD && new MockAdapter(http);

export default http;
export * from './transform';
