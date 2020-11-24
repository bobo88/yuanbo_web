// ================================================================================
// 全局统一修改js原型链的地方
// ================================================================================

/* eslint-disable */

/**
 * 替换符合s1的字符串全部替换为s2
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2)
}

/**
 * 清除所有的空格
 * @returns {*}
 */
String.prototype.removeSpace = function () {
  var str = this.replaceAll(' ', '').replaceAll('	', '').replaceAll('&nbsp;', '').replaceAll('\u0026nbsp;', '').replaceAll('\n', '')
  return str
}

/**
 * 给Promise添加最终一定执行的方法
 * @param callback
 * @returns {Promise.<TResult>}
 */
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  )
}

/**
 * 判断一个对象是否为dom节点
 * @param obj
 * @returns {*}
 */
// Object.prototype.isDom = function (obj) {
//   if (typeof HTMLElement === 'object') {
//     return obj instanceof HTMLElement;
//   } else {
//     return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
//   }
// }

/**
 * 判断一个对象是否为Event
 * @param obj
 * @returns {*}
 */
// Object.prototype.isEvent = function (obj) {
//   return obj.target && obj.clientX && obj.clientY
// }

/**
 * 对象深度拷贝
 */
// Object.prototype.deepClone = function () {
//   let oldObj = this
//   // 定义一个新的空对象
//   let newObject = {}
//   if (oldObj) {
//     if (oldObj.constructor === Object) {
//       newObject = new oldObj.constructor()
//     } else {
//       newObject = new oldObj.constructor(oldObj.valueOf())
//     }
//     // 遍历克隆原对象属性
//     for (const key in oldObj) {
//       if (newObject[key] !== oldObj[key]) {
//         if (typeof(oldObj[key]) === 'object') {
//           // 对象内部的子对象
//           newObject[key] = oldObj[key].deepClone()
//         } else {
//           newObject[key] = oldObj[key]
//         }
//       }
//     }
//     // 克隆原对象常用的方法
//     newObject.toString = oldObj.toString
//     newObject.valueOf = oldObj.valueOf
//     return newObject
//   }
// }
