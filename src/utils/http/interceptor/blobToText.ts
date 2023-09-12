/**
 * 将 blob 类型的 response.data 转换为 string
 */
import type { AxiosResponse } from 'axios';

export default async function (res: AxiosResponse) {
  const data: Blob = res.data;
  if (data.type === 'application/json') {
    res.data = JSON.parse(await data.text());
  } else {
    res.data = await data.text();
  }
  return res;
}
