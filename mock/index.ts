import { MethodType, Recordable } from 'vite-plugin-mock';
const baseUrl = '/backend';

/** 自定义 MockMethod */
export declare interface CustomMockMethod {
  url: string;
  method?: MethodType;
  response: (
    this: { res: { statusCode: number } },
    opt: {
      url: string;
      body: Recordable;
      query: Recordable;
      headers: Recordable;
    },
  ) => any;
}

/**
 * 封装 MockMethod
 * @param mockMethod 原始 mock 方法数组
 * @returns 封装后的 mock 方法数组
 */
export default function createMockMethod(
  ...mockMethod: CustomMockMethod[]
): CustomMockMethod[] {
  return mockMethod.map((item) => ({
    method: 'post',
    ...item,
    url: baseUrl + item.url,
    response(this, opt) {
      return item.response?.call(this, opt);
    },
  }));
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
