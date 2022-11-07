import type { AxiosResponse } from 'axios';

export default async function (resp: AxiosResponse) {
  const data: Blob = resp.data;
  if (data.type === 'text/html') {
    resp.data = await data.text();
  } else if (data.type === 'application/json') {
    resp.data = JSON.parse(await data.text());
  }
  return resp;
}
