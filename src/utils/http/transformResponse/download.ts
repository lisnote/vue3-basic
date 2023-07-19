import { AxiosRequestConfig, AxiosHeaders } from 'axios';

/**
 * 通过设定 transformResponse 进行文件下载
 * @example
 * ```javascript
 * import http, { download } from '@/utils/http';
 * http({
 *   url: '/favicon.ico',
 *   transformResponse: download('fileName'),
 * });
 * ```
 */
export function download(fileName?: string) {
  return function (
    this: AxiosRequestConfig,
    data: Blob,
    headers: AxiosHeaders,
  ) {
    if (fileName === undefined) {
      const disposition = String(
        headers.get('content-disposition') ?? this.url?.split('/').pop(),
      );
      fileName = decodeURI(disposition.replace(/.*filename=(.*)/, '$1'));
    }
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
