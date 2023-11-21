import type { FormRules } from 'element-plus';
type ArrayAbleFormItemRule = Exclude<FormRules['validator'], undefined>;
type ExtractArray<T> = T extends Array<infer U> ? U : never;
type Validator = Exclude<
  ExtractArray<ArrayAbleFormItemRule>['validator'],
  undefined
>;

// 基础判断函数 -------------------------------------------------------------
/**
 * 判断字符串是否包含字母
 * @param str 待检查字符串
 * @returns 判断结果 判断结果
 */
export function hasLetter(str: string): boolean {
  return /[a-zA-Z]/.test(str);
}
/**
 * 判断字符串是否包含数字
 * @param str 待检查字符串
 * @returns 判断结果
 */
export function hasNumber(str: string): boolean {
  return /\d/.test(str);
}
/**
 * 判断字符串长度是否在指定范围
 * @param str 待检查的字符串
 * @param options 字符串长度配置对象
 * @returns 判断结果
 * @example
 * lengthInRange(value,{max:20})
 * lengthInRange(value,{min:8, max:20})
 */
export function lengthInRange(
  { length }: string,
  { min, max }: { min?: number; max?: number },
): boolean {
  if ((min || min === 0) && min > length) {
    return false;
  } else if ((max || max === 0) && max < length) {
    return false;
  } else {
    return true;
  }
}

// 具体校验函数 -------------------------------------------------------------
// 用户名输入验证
export const accountValidator: Validator = function (_rule, value, cb) {
  if (!lengthInRange(value, { min: 4, max: 16 })) {
    cb('长度必须为4-16位');
  } else if (!hasLetter(value)) {
    cb('必须包含字母');
  } else if (!/^[\w.-]*$/.test(value)) {
    cb('只允许使用字母，数字、特殊符号._-');
  } else {
    cb();
  }
};
// 手机号输入验证
export const phoneValidator: Validator = function (_rule, value, cb) {
  if (!lengthInRange(value, { min: 11, max: 11 })) {
    cb('长度必须为11位');
  } else if (value[0] != 1) {
    cb('只允许1开始的手机号');
  } else if (!/^1\d{10}$/.test(value)) {
    cb('只允许使用数字');
  } else {
    cb();
  }
};
// 密码输入验证
export const passwordValidator: Validator = function (_rule, value, cb) {
  if (!lengthInRange(value, { min: 8, max: 20 })) {
    cb('长度必须为8-20位');
  } else if (!hasLetter(value) || !hasNumber(value)) {
    cb('必须包含字母和数字');
  } else if (!/^[\w.-]*$/.test(value)) {
    cb('只允许使用字母，数字，特殊符号._-');
  } else {
    cb();
  }
};
// 验证码输入验证
export const smsCodeValidator: Validator = function (_rule, value, cb) {
  value = String(value);
  if (value.length !== 6) {
    cb('长度必须为6位');
  } else if (!/^\d*$/.test(value)) {
    cb('只允许使用数字');
  } else {
    cb();
  }
};
