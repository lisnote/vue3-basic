import { MockMethod } from 'vite-plugin-mock';

const baseUrl = '/backend';

export function createMockMethod(...mockMethod: MockMethod[]): MockMethod[] {
  return mockMethod.map((item) => ({ ...item, url: baseUrl + item.url }));
}
