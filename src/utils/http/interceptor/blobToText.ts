import type { AxiosResponse } from 'axios';

/** 将 blob 类型的 response.data 转换为 json/string */
export default async function (res: AxiosResponse) {
  const data: Blob = res.data;
  if (data.type === 'application/json') {
    res.data = JSON.parse(await data.text());
  } else if (data.text) {
    res.data = await data.text();
  }
  return res;
}
