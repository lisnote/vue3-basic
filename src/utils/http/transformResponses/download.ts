/**
 * 通过设定 transformResponse 进行文件下载
 * example:
 * import http, { download } from '@/utils/http';
 * http({
 *   url: '/favicon.ico',
 *   transformResponse: download('fileName'),
 * });
 */
import { AxiosHeaders } from 'axios';

export function download(fileName?: string) {
  return function (data: Blob, headers: AxiosHeaders) {
    const disposition = (headers.get('content-disposition') ?? '') as string;
    fileName =
      fileName ?? decodeURI(disposition.replace(/.*filename=(.*)/, '$1'));
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return data;
  };
}
