import { t } from '@/locales';
import type { FormRules } from '@/components/ElementPlus';
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
    cb(t('validator.lengthMustBe', ['4-16']));
  } else if (!hasLetter(value)) {
    cb(t('validator.account.mustContain'));
  } else if (!/^[\w.-]*$/.test(value)) {
    cb(t('validator.account.onlyAllowed'));
  } else {
    cb();
  }
};
// 手机号输入验证
export const phoneValidator: Validator = function (_rule, value, cb) {
  if (value.length !== 11) {
    cb(t('validator.lengthMustBe', [11]));
  } else if (value[0] != 1) {
    cb(t('validator.phone.startWith'));
  } else if (!/^1\d{10}$/.test(value)) {
    cb(t('validator.phone.onlyAllowed'));
  } else {
    cb();
  }
};
// 密码输入验证
export const passwordValidator: Validator = function (_rule, value, cb) {
  if (!lengthInRange(value, { min: 8, max: 20 })) {
    cb(t('validator.lengthMustBe', ['8-20']));
  } else if (!hasLetter(value) || !hasNumber(value)) {
    cb(t('validator.password.mustContain'));
  } else if (!/^[\w.-]*$/.test(value)) {
    cb(t('validator.password.onlyAllowed'));
  } else {
    cb();
  }
};
// 验证码输入验证
export const smsCodeValidator: Validator = function (_rule, value, cb) {
  value = String(value);
  if (value.length !== 6) {
    cb(t('validator.lengthMustBe', [6]));
  } else if (!/^\d*$/.test(value)) {
    cb(t('validator.smsCode.onlyAllowed'));
  } else {
    cb();
  }
};
