import http from '@/utils/http';
import { AxiosRequestConfig } from 'axios';

// 获取验证码
export const smsCodeType = {
  signup: 0,
  login: 1,
  resetPassword: 2,
  permanentlyDeleteAccount: 3,
  twoFactorAuthentication: 4,
  deleteProject: 5,
} as const;
export async function sendSmsCode(
  data: { phone: string; type: typeof smsCodeType[keyof typeof smsCodeType] },
  config?: AxiosRequestConfig,
) {
  return http.post('/basic/sendSmsCode', data, config);
}
