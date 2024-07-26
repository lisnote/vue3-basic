import { useRafThrottle } from '../functionOptimizers';
import { addRemoveListener } from './remove';

type ResizeListener = (event: {
  entries: ResizeObserverEntry[];
  observer: ResizeObserver;
}) => void;

const elementMap = new WeakMap<
  HTMLElement,
  { listeners: ResizeListener[]; observer: ResizeObserver }
>();

/**
 * 监听元素的尺寸变化
 * @param element - 要添加监听器的元素
 * @param listener - 监听器
 */
export function addResizeListener(
  element: HTMLElement,
  listener: ResizeListener,
) {
  const listeners = getMapValue(element);
  listeners.push(listener);
  addRemoveListener(element, () => removeResizeListener(element, listener));
}

/**
 * 移除元素的尺寸变化监听
 * @param element - 要移除监听器的元素
 * @param listener - 要移除的监听器
 */
export function removeResizeListener(
  element: HTMLElement,
  listener: ResizeListener,
) {
  const { listeners, observer } = elementMap.get(element) ?? {};
  if (!listeners?.length) return;
  listeners.splice(listeners.indexOf(listener), 1);
  if (!listener.length) observer?.disconnect();
}

function getMapValue(element: HTMLElement) {
  let { listeners } = elementMap.get(element) ?? {};
  if (listeners?.length) return listeners;
  listeners = [];
  const observer = new ResizeObserver(
    useRafThrottle(resizeHandle.bind(listeners)),
  );
  observer.observe(element);
  elementMap.set(element, { listeners, observer });
  return listeners;
}

function resizeHandle(
  this: ResizeListener[],
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) {
  this.forEach((fn) => fn({ entries, observer }));
}
