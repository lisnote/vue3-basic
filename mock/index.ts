import { MockMethod } from 'vite-plugin-mock';

const baseUrl = '/backend';

/**
 * 封装 MockMethod
 * @param {MockMethod[]} mockMethod 原始 mock 方法数组
 * @returns {MockMethod[]} 封装后的 mock 方法数组
 */
export function createMockMethod(...mockMethod: MockMethod[]): MockMethod[] {
  return mockMethod.map((item) => ({ ...item, url: baseUrl + item.url }));
}

/**
 * 模拟分页查询
 * @param list 数据数组
 * @param page 页数
 * @param limit 查询长度
 * @returns 查询到的数据
 */
export function queryList<T>(list: T[], page = 1, limit = 10) {
  const end = page * limit;
  const start = end - limit;
  return list.slice(start, end);
}
