/**
 * 包含一系列用于优化函数的高阶函数
 * 基于时间的节流和防抖, 基于帧动画的节流
 */
export {
  useDebounceFn as useDebounce,
  useThrottleFn as useThrottle,
} from '@vueuse/core';
/**
 * 基于帧动画的节流函数
 * @param {T} fn 需要节流的函数
 * @returns {T}
 */
export function useRafThrottle<T extends (...args: any[]) => void>(fn: T): T {
  let locked = false;
  return function (this: CallableFunction, ...args: Parameters<T>) {
    if (locked) return;
    locked = true;
    requestAnimationFrame(() => {
      fn.apply(this, args);
      locked = false;
    });
  } as T;
}
