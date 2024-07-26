import { useRafThrottle } from '../functionOptimizers';

type ResizeListener = (event: {
  entries: ResizeObserverEntry[];
  observer: ResizeObserver;
}) => void;

const elementMap = new WeakMap<HTMLElement, ResizeListener[]>();

/**
 * 监听指定元素尺寸变化
 * @param element - 要添加监听器的元素
 * @param listener - 监听器
 */
export function addResizeListener(
  element: HTMLElement,
  listener: ResizeListener,
) {
  const listeners = getMapValue(element);
  listeners.push(listener);
}

/**
 * 关闭元素的尺寸变化监听
 * @param element - 要移除监听器的元素
 * @param listener - 要移除的监听器
 */
export function removeResizeListener(
  element: HTMLElement,
  listener: ResizeListener,
) {
  const listeners = elementMap.get(element);
  if (listeners) listeners.splice(listeners.indexOf(listener), 1);
}

function getMapValue(element: HTMLElement) {
  let listeners = elementMap.get(element);
  if (listeners) return listeners;
  listeners = [];
  const ro = new ResizeObserver(useRafThrottle(resizeHandle.bind(listeners)));
  ro.observe(element);
  elementMap.set(element, listeners);
  return listeners;
}

function resizeHandle(
  this: ResizeListener[],
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) {
  this.forEach((fn) => fn({ entries, observer }));
}
