import { MockMethod } from 'vite-plugin-mock';

const baseUrl = '/backend';

/**
 * 封装 MockMethod
 * @param mockMethod 原始 mock 方法数组
 * @returns 封装后的 mock 方法数组
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

/**
 * 获取树的节点列表
 * @param tree 待处理的树
 * @param children 子节点列表的字段名
 * @param list 树节点列表
 * @returns
 */
export function treeToList<T extends any[]>(
  tree: T,
  children: string = 'children',
  list: T = [] as any,
): T {
  tree.forEach((node) => {
    list.push(node);
    const childNodes = node[children];
    if (childNodes?.length) treeToList(childNodes, children, list);
  });
  return list;
}

/**
 * 函数遍历树的每一个节点
 * @param tree 待处理的树
 * @param handle 处理函数
 * @param children 子节点列表的字段名
 */
export function treeForEach<T extends any[]>(
  tree: T,
  handle: (node: T[number], parent?: T[number]) => void,
  {
    children = 'children',
    parent,
  }: { children?: string; parent?: T[number] } = {},
) {
  tree.forEach((node) => {
    handle(node, parent);
    const childNodes = node[children];
    if (childNodes?.length) {
      treeForEach(childNodes, handle, { children, parent: node });
    }
  });
}
