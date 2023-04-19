import dayjs, { Dayjs, ConfigType, OpUnitType } from 'dayjs';

export default dayjs;

/**
 * 解析 dayjs 可以处理的对象
 * @param date
 * @returns {Dayjs}
 */
export const dateParse = dayjs;

/**
 * 处理 date 对象为指定格式的字符串
 * @param date
 * @param format 默认值为'YYYY-MM-DD hh:mm:ss'
 * @returns {string}
 */
export function dateFormat(
  date: ConfigType,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  return dateParse(date).format(format);
}

/**
 * 返回传入时间的今日起止时间
 * @param date
 * @param unit 时间单位
 * @param formater 格式化函数
 * @returns {string[]}
 */
export function dateRange(
  date: ConfigType,
  unit: OpUnitType,
  formater: (date: Dayjs) => string = dateFormat,
): string[] {
  return [
    formater(dateParse(date).startOf(unit)),
    formater(dateParse(date).endOf(unit)),
  ];
}
