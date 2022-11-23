import { AxiosHeaders } from 'axios';

export function download(fileName?: string) {
  return function (data: Blob, headers: AxiosHeaders) {
    const disposition = (headers.get('content-disposition') ?? '') as string;
    fileName =
      fileName ?? decodeURI(disposition.replace(/.*filename=(.*)/, '$1'));
    const url = window.URL.createObjectURL(data);
    console.log(url, data);
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
