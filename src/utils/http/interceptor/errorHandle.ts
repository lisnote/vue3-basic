/**
 * 全局异常请求处理
 */
import { ElMessage } from 'element-plus';
import type { AxiosError } from 'axios';

const codeMessageMap: { [key: number]: string } = {
  // 1xxxx: 后端异常
  10000: '系统异常',
  // 2xxxx: 前端异常
  20001: '参数异常',
  20002: '参数校验未通过',
  // 3xxxx: basic异常
  30000: '基础服务器异常',
  30001: '请求频率过高',
  30002: '验证码无效',
  // 4xxxx: user异常
  40000: '用户服务器异常',
  40001: '用户已存在',
  40002: '用户不存在',
  40003: '密码错误',
  40004: '登录授权过期',
  40005: '无权访问',
};
export default async function (error: AxiosError) {
  const blob = error.response?.data as Blob;
  let message = '';
  if (blob.type === 'application/json') {
    const data = JSON.parse(await blob.text());
    message = codeMessageMap[data.code];
  }
  ElMessage.error(message || '未知异常');
  throw error;
}
