/**
 * blob,blob url,dataurl,canvas互相转换
 */

/**
 * 将canvas转换成data url
 * @param canvas 待转换的canvas
 * @returns 转换后的data url
 */
export function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}
/**
 * 将canvas转换成blob
 * @param canvas 待转换的canvas
 * @returns 转换后的blob
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Blob {
  return dataUrlToBlob(canvasToDataUrl(canvas));
}
/**
 * 将canvas转换成blob url
 * @param canvas 待转换的canvas
 * @returns 转换后的blob url
 */
export function canvasToBlobUrl(canvas: HTMLCanvasElement): string {
  return blobToBlobURL(canvasToBlob(canvas));
}
/**
 * 将data url转换成blob
 * @param dataUrl 待转换的data url
 * @returns 转换后的blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
/**
 * 将data url转换成blob url
 * @param dataUrl 待转换的data url
 * @returns 转换后的blob url
 */
export function dataUrlToBlobUrl(dataUrl: string): string {
  return blobToBlobURL(dataUrlToBlob(dataUrl));
}
/**
 * 将blob转换成blob url
 * @param blob 待转换的blob
 * @returns 转换后的blob url
 */
export function blobToBlobURL(blob: Blob): string {
  return URL.createObjectURL(blob);
}
/**
 * 将url转换成canvas
 * @param url 待转换的url
 * @returns 转换后的canvas
 */
export async function urlToCanvas(url: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(
      'load',
      () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context?.drawImage(image, 0, 0);
        resolve(canvas);
      },
      { once: true },
    );
    image.addEventListener('error', (error) => reject(error), { once: true });
    image.src = url;
  });
}
