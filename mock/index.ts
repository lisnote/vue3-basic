import { MockMethod } from 'vite-plugin-mock';

const baseUrl = '/backend';

export function createMockMethod(...mockMethod: MockMethod[]): MockMethod[] {
  return mockMethod.map((item) => ({ ...item, url: baseUrl + item.url }));
}

export function queryList<T>(list: T[], page = 1, limit = 10) {
  const end = page * limit;
  const start = end - limit;
  return list.slice(start, end);
}
