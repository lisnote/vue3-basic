/**
 * 全局异常请求处理
 */
import { ElMessage } from 'element-plus';
import type { AxiosError } from 'axios';
import { t } from '@/locales';

export default async function (error: AxiosError) {
  const blob = error.response?.data as Blob;
  let message = t('errorCode.unknownNetworkException');
  if (blob.type === 'application/json') {
    const data = JSON.parse(await blob.text());
    const messageKey = 'errorCode.' + data.code;
    const tMessage = t(messageKey);
    message = messageKey === tMessage ? message : tMessage;
  }
  ElMessage.error(message);
  throw error;
}
