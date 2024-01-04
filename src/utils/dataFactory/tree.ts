/** 树结构的数据处理方法集 */

/**
 * 树结构数据修剪, 直接影响原对象, 移除自身及子树指定字段的值不含search值的树
 * @param tree 待处理的树数据
 * @param search 查找的值或查找函数
 * @param children 树的子节点组的字段名
 * @returns 被修剪的树
 */
export function treeCleaner<T extends any[]>(
  tree: T,
  predicate: (node: T[number]) => boolean,
  children: keyof T[number] = 'children',
): T {
  return tree.reduceRight((pre, now, index) => {
    if (predicate(now)) {
      return pre;
    }
    if (now[children]) {
      treeCleaner(now[children], predicate, children);
    }
    if ((now[children]?.length ?? 0) < 1) {
      tree.splice(index, 1);
    }
    return pre;
  }, tree);
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
  }: { children?: keyof T[number]; parent?: T[number] } = {},
): T[number] | void {
  for (const child of tree) {
    if (predicate(child, parent)) return child;
    if (child[children]) {
      const target = treeFind(child[children], predicate, {
        children,
        parent: child,
      });
      if (target) return target;
    }
  }
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
  children: keyof T[number] = 'children',
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
    handleTiming = 'afterChildren',
  }: {
    children?: keyof T[number];
    parent?: T[number];
    handleTiming?: 'beforeChildren' | 'afterChildren';
  } = {},
) {
  tree.forEach((node) => {
    if (handleTiming === 'beforeChildren') handle(node, parent);
    const childNodes = node[children];
    if (childNodes?.length) {
      treeForEach(childNodes, handle, { children, parent: node });
    }
    if (handleTiming === 'afterChildren') handle(node, parent);
  });
}
