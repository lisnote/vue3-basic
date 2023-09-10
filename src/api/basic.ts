import http from '@/utils/http';
import { AxiosRequestConfig } from 'axios';

// 获取验证码
export async function sendSmsCode(
  data: { name: string; password: string },
  config?: AxiosRequestConfig,
) {
  return http.post('/basic/sendSmsCode', data, config);
}
