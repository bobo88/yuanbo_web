import Vue from 'vue'
/**
 * ================================================================================
 * 过滤器
 * ================================================================================
 */

 /**
 *  把html转义成HTML实体字符
 * @param str
 * @returns {string}
 * @constructor
 */
export const htmlEncode = (str) => {
  var s = "";
  if (str.length === 0) {
    return "";
  }
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\'/g, "&#39;");//IE下不支持实体名称
  s = s.replace(/\"/g, "&quot;");
  return s;
}

/**
 *  转义字符还原成html字符
 * @param str
 * @returns {string}
 * @constructor
 */
export const htmlRestore = (str) => {
  var s = "";
  if (str.length === 0) {
    return "";
  }
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  return s;
}

// 格式化日期 yyyy-MM-dd
export const dateFormatYyyyMmDd = (timestamp) => {
  if (!timestamp) {
    return ''
  }
  const _timestamp = new Date(timestamp)
  let s = ''
  const mouth = (_timestamp.getMonth() + 1) >= 10 ? (_timestamp.getMonth() + 1) : ('0' + (_timestamp.getMonth() + 1))
  const day = _timestamp.getDate() >= 10 ? _timestamp.getDate() : ('0' + _timestamp.getDate())
  s += _timestamp.getFullYear() + '-' // 获取年份。
  s += mouth + '-' // 获取月份。
  s += day // 获取日。
  return (s) // 返回日期。
}
/**
 * 格式化为日期时间 yyyy-MM-dd HH:mm:ss
 *
 * @param timestamp
 * @returns {*}
 */
export const formatYmdhmsTime = (time) => {
  if (!time) {
    return ''
  }
  const dateObj = new Date(time)
  return dateObj.toLocaleDateString() + ' ' + dateObj.toTimeString().split(' ')[0]
}
/**
 * 格式化为日期时间， 只返回HH:mm:ss
 *
 * @param timestamp
 * @returns {*}
 */
export const formatHmsTime = (time) => {
  if (!time) {
    return ''
  }
  const dateObj = new Date(time)
  return dateObj.toTimeString().split(' ')[0]
}
const filters = {
  htmlEncode,
  htmlRestore,
  dateFormatYyyyMmDd,
  formatYmdhmsTime,
  formatHmsTime
}

export default filters
// 注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Object.defineProperty(Vue.prototype, '$filters', { 'value': filters });
