/**
 * 树结构的数据处理方法集
 */
import { cloneDeep } from 'lodash-es';
/**
 * @typedef treeCleanerProps
 * @type {object}
 * @prop {string} children
 * @prop {string} filed
 */

/**
 * 树结构数据清理, 直接影响原对象, 移除自身及子树指定字段的值不含search值的树
 * @param {any} tree 待处理的树数据
 * @param {string} search 查找的值
 * @param {treeCleanerProps} props 树属性及查找字段
 * @returns {any} 过滤后的树
 */
export function treeCleaner(
  tree: any,
  search: string,
  props?: { children?: string; field?: string },
): any {
  const { children, field } = Object.assign(
    { children: 'children', field: 'id' },
    props,
  );
  return tree.reduceRight((pre: undefined, now: any, index: number) => {
    if (now[children]) treeCleaner(now[children], search, { children, field });
    if (!(now[children]?.length > 0 || now[field].includes(search))) {
      tree.splice(index, 1);
    }
    return pre;
  }, tree);
}

/**
 * 树结构数据过滤, 不影响原对象, 过滤自身及子树指定字段的值不含search值的树
 * @param {any} tree 待处理的树数据
 * @param {string} search 查找的值
 * @param {treeCleanerProps} props 树属性及查找字段
 * @returns {any} 过滤后的树
 */
export function treeFilter(
  tree: any,
  search: string,
  props?: { children?: string; field?: string },
): any {
  return treeCleaner(cloneDeep(tree), search, props);
}
