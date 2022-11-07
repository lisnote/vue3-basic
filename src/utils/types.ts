export function getType(value: unknown) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
export function is(value: unknown, type: string) {
  return getType(value) === type;
}
export function isObject(value: unknown) {
  return is(value, 'Object');
}
export function isArray(value: unknown) {
  return Array.isArray(value);
}
