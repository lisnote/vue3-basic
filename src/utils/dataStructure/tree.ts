/**
 * 树结构的数据处理方法集
 */
import { cloneDeep } from 'lodash-es';

interface TreeProps {
  children?: string;
  field?: string;
}

/**
 * 树结构数据修剪, 直接影响原对象, 移除自身及子树指定字段的值不含search值的树
 * @param {T} tree 待处理的树数据
 * @param {string} search 查找的值
 * @param {TreeProps} props 树属性及查找字段
 * @returns {T} 被修剪的树
 */
export function treeCleaner<T extends any[]>(
  tree: T,
  search: string,
  props?: TreeProps,
): T {
  const { children, field } = Object.assign(
    { children: 'children', field: 'id' },
    props,
  );
  return tree.reduceRight((pre, now, index) => {
    if (now[field].includes(search)) return pre;
    if (now[children]) {
      treeCleaner(now[children], search, { children, field });
    }
    if (now[children]?.length ?? 0 < 1) {
      tree.splice(index, 1);
    }
    return pre;
  }, tree);
}

/**
 * 树结构数据过滤, 不影响原对象, 过滤自身及子树指定字段的值不含search值的树
 * @param {T} tree 待处理的树数据
 * @param {string} search 查找的值
 * @param {TreeProps} props 树属性及查找字段
 * @returns {T} 被过滤的树
 */
export function treeFilter<T extends any[]>(
  tree: T,
  search: string,
  props?: TreeProps,
): T {
  return treeCleaner(cloneDeep(tree), search, props);
}

/**
 * 获取树的节点列表
 * @param {T} tree 待处理的树
 * @param {string} children 子节点列表的字段名
 * @param {T} list 树节点列表
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
 * @param {T} tree 待处理的树
 * @param {(node: T[number]) => void} handle 处理函数
 * @param {string} children 子节点列表的字段名
 */
export function treeForEach<T extends any[]>(
  tree: T,
  handle: (node: T[number]) => void,
  children: string = 'children',
) {
  tree.forEach((node) => {
    handle(node);
    const childNodes = node[children];
    if (childNodes?.length) treeForEach(childNodes, handle, children);
  });
}
