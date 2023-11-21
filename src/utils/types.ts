/**
 * 包含类型获取, 类型判断相关方法
 */

/**
 * 获取值类型
 * @param value 待获取类型的值
 * @returns 返回获取的类型
 * @example
 * ```javascript
 * getType({})
 * // output: 'Object'
 * ```
 */
export function getType(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

/**
 * 判断值是否为某类型
 * @param value 待获取类型的值
 * @param type 判断的类型
 * @returns 返回获取的类型
 * @example
 * ```javascript
 * is({}, 'Object')
 * // output: true
 * ```
 */
export function is(value: unknown, type: string): boolean {
  return getType(value) === type;
}

/**
 * 判断值是否为 Array 类型
 */
export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

/**
 * 判断值是否为 Object 类型
 */
export function isObject(value: unknown): boolean {
  return is(value, 'Object');
}

/**
 * 判断值是否为 String 类型
 */
export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

/**
 * 判断值是否为 Number 类型
 */
export function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

/**
 * 判断值是否为 Boolean 类型
 */
export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean';
}

/**
 * 判断值是否为 Null 类型
 */
export function isNull(value: unknown): boolean {
  return value === null;
}

/**
 * 判断值是否为 Undefined 类型
 */
export function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined';
}

/**
 * 判断值是否为 Symbol 类型
 */
export function isSymbol(value: unknown): boolean {
  return typeof value === 'symbol';
}
