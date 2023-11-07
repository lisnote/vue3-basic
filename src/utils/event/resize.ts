import { useRafThrottle } from '../functionOptimizers';

type ResizeListener = (event: {
  entries: ResizeObserverEntry[];
  observer: ResizeObserver;
}) => void;

const elementMap = new WeakMap<HTMLElement, ResizeListener[]>();

export function addResizeListener(
  element: HTMLElement,
  listener: ResizeListener,
) {
  const listeners = getMapValue(element);
  listeners.push(listener);
}

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
