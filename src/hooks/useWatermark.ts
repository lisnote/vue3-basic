import {
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  Ref,
  shallowRef,
  unref,
} from 'vue';
import { useRafThrottle } from '@/utils/functionOptimizers';
import { isDefined } from '@vueuse/core';
const domSymbol = Symbol('watermark-dom');

type attr = {
  font?: string;
  fillStyle?: string;
};

export function useWatermark(
  appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>,
): {
  setWatermark: (str: string, attr?: attr | undefined) => void;
  clear: () => void;
} {
  const func = useRafThrottle(function () {
    const el = unref(appendEl);
    if (!el) return;
    const { clientHeight: height, clientWidth: width } = el;
    updateWatermark({ height, width });
  });
  const id = domSymbol.toString();
  const watermarkEl = shallowRef<HTMLElement>();

  const clear = () => {
    const domId = unref(watermarkEl);
    watermarkEl.value = undefined;
    const el = unref(appendEl);
    if (!el) return;
    domId && el.removeChild(domId);
    window.removeEventListener('resize', func);
  };

  function createBase64(str: string, attr?: attr) {
    const can = document.createElement('canvas');
    const width = 300;
    const height = 240;
    Object.assign(can, { width, height });
    const cans = can.getContext('2d');
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120);
      cans.font = attr?.font ?? '15px Reggae One';
      cans.fillStyle = attr?.fillStyle ?? 'rgba(0, 0, 0, 0.15)';
      cans.textAlign = 'left';
      cans.textBaseline = 'middle';
      cans.fillText(str, width / 20, height);
    }
    return can.toDataURL('image/png');
  }

  function updateWatermark(
    options: {
      width?: number;
      height?: number;
      str?: string;
      attr?: attr;
    } = {},
  ) {
    const el = unref(watermarkEl);
    if (!el) return;
    if (isDefined(options.width)) {
      el.style.width = `${options.width}px`;
    }
    if (isDefined(options.height)) {
      el.style.height = `${options.height}px`;
    }
    if (isDefined(options.str)) {
      el.style.background = `url(${createBase64(
        options.str,
        options.attr,
      )}) left top repeat`;
    }
  }

  const createWatermark = (str: string, attr?: attr) => {
    if (unref(watermarkEl)) {
      updateWatermark({ str, attr });
      return id;
    }
    const div = document.createElement('div');
    watermarkEl.value = div;
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.position = 'absolute';
    div.style.zIndex = '100000';
    const el = unref(appendEl);
    if (!el) return id;
    const { clientHeight: height, clientWidth: width } = el;
    updateWatermark({ str, width, height, attr });
    el.appendChild(div);
    return id;
  };

  function setWatermark(str: string, attr?: attr) {
    window.addEventListener('resize', func);
    createWatermark(str, attr);
    const instance = getCurrentInstance();
    if (instance) {
      onBeforeUnmount(() => {
        clear();
      });
    }
  }

  return { setWatermark, clear };
}
