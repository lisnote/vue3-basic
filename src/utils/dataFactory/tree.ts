/**
 * 树结构的数据处理方法集
 */
import { cloneDeep } from 'lodash-es';

/**
 * 树结构数据修剪, 直接影响原对象, 移除自身及子树指定字段的值不含search值的树
 * @param tree 待处理的树数据
 * @param search 查找的值或查找函数
 * @param props 树属性及查找字段
 * @returns 被修剪的树
 */
export function treeCleaner<T extends any[]>(
  tree: T,
  predicate: (node: T[number]) => boolean,
  {
    children = 'children',
    field = 'id',
  }: {
    children?: string;
    field?: string;
  } = {},
): T {
  return tree.reduceRight((pre, now, index) => {
    if (predicate(now)) {
      return pre;
    }
    if (now[children]) {
      treeCleaner(now[children], predicate, { children, field });
    }
    if ((now[children]?.length ?? 0) < 1) {
      tree.splice(index, 1);
    }
    return pre;
  }, tree);
}

/**
 * 树结构数据过滤, 不影响原对象, 过滤自身及子树指定字段的值不含search值的树
 * @param tree 待处理的树数据
 * @param search 查找函数
 * @param props 树属性及查找字段
 * @returns 被过滤的树
 */
export function treeFilter<T extends any[]>(
  tree: T,
  predicate: (node: T[number]) => boolean,
  props: {
    children?: string;
    field?: string;
  },
): T {
  return treeCleaner(cloneDeep(tree), predicate, props);
}

/**
 * 获取树的节点列表
 * @param tree 待处理的树
 * @param children 子节点列表的字段名
 * @param list 树节点列表
 * @returns 全部节点
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

/**
 * 查找第一个符合要求的节点
 * @param tree 待处理的树
 * @param predicate 查找函数
 * @param children 子节点列表的字段名
 * @returns 找到的子节点
 */
export function treeFind<T extends any[]>(
  tree: T,
  predicate: (node: T[number], parent?: T[number]) => boolean,
  {
    children = 'children',
    parent,
  }: { children?: string; parent?: T[number] } = {},
): T[number] | void {
  for (const child of tree) {
    if (child[children]) {
      const target = treeFind(child[children], predicate, {
        children,
        parent: child,
      });
      if (target) return target;
    }
    if (predicate(child, parent)) return child;
  }
}
