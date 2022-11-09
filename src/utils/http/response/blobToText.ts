import type { AxiosResponse } from 'axios';

export default async function (res: AxiosResponse) {
  const data: Blob = res.data;
  if (data.type === 'text/html') {
    res.data = await data.text();
  } else if (data.type === 'application/json') {
    res.data = JSON.parse(await data.text());
  }
  return res;
}
