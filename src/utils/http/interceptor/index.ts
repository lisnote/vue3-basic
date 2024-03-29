import emptyFilter from './emptyFilter';
import blobUrl from './blobUrl';
import authorization from './authorization';
import blobToText from './blobToText';
import errorHandle from './errorHandle';
import type { AxiosInstance } from 'axios';

/**
 * 使用拦截器
 * @param http 需要使用拦截器的Axios实例
 */
export default function useInterceptors(http: AxiosInstance) {
  // 请求拦截
  http.interceptors.request.use(emptyFilter);
  http.interceptors.request.use(blobUrl);
  http.interceptors.request.use(authorization);
  // 响应拦截
  http.interceptors.response.use(blobToText, errorHandle);
}
