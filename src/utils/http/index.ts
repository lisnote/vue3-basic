/**
 * 创建 axios 实例, 绑定中间件并作为默认导出
 * 导出所有 transformResponse 相关方法
 */
import axios from 'axios';
import useRequest from './request';
import useResponse from './response';

const http = axios.create({
  baseURL: '/',
  timeout: 5000,
  responseType: 'blob',
});

useRequest.forEach((use) => http.interceptors.request.use(use));
useResponse.forEach((use) => http.interceptors.response.use(use));

export default http;
export * from './transformResponse';
