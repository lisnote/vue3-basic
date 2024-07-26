type RemoveListener = (mutation: MutationRecord) => void;
const elementList: HTMLElement[] = [];
const elementMap = new WeakMap<HTMLElement, RemoveListener[]>();
let observer: MutationObserver;
/**
 * 监听元素的移除事件, 并在dom移除后自动移除监听
 * @param element - 要添加监听器的元素
 * @param listener - 监听器
 */
export function addRemoveListener(
  element: HTMLElement,
  listener: RemoveListener,
) {
  if (!observer) {
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.removedNodes.length === 0) continue;
        [...elementList].forEach((element) => {
          const isContainsElement = Array.from(mutation.removedNodes).find(
            (node) => node.contains(element),
          );
          if (!isContainsElement) return;
          const listeners = elementMap.get(element);
          listeners?.forEach((listener) => listener(mutation));
          elementList.splice(elementList.indexOf(element), 1);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (!elementList.includes(element)) elementList.push(element);
  const listeners = elementMap.get(element) ?? [];
  if (!listeners.length) elementMap.set(element, listeners);
  listeners.push(listener);
}
/**
 * 移除元素的移除事件监听
 * @param element - 要移除监听器的元素
 * @param listener - 要移除的监听器
 */
export function removeRemoveListener(
  element: HTMLElement,
  listener: RemoveListener,
) {
  const listeners = elementMap.get(element);
  if (!listeners?.length) return;
  listeners.splice(listeners.indexOf(listener), 1);
  if (!listener.length) elementList.splice(elementList.indexOf(element), 1);
}
