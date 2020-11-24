let device = {}

/**
 * 浏览器相关属性
 */
device.browser = {
  versions: function () {
    let u = navigator.userAgent, app = navigator.appVersion
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      pc: /macintosh|window/.test(navigator.userAgent.toLowerCase())
    }
  }()
};

/**
 * 是否在移动端
 * @returns {boolean|*}
 */
device.mobile = function () {
  return this.browser.versions.mobile
}

/**
 * 是否为微信
 * @returns {device.weixin|*}
 */
device.weixin = function () {
  return this.browser.versions.weixin
}

/**
 * 是否为移动版微信
 * @returns {boolean}
 */
device.mobileWeixin = function () {
  if (this.weixin()) {
    return !this.browser.versions.pc
  } else {
    return false
  }
}

/**
 * 是否为ios设置
 * @returns {boolean|*}
 */
device.ios = function () {
  return this.browser.versions.ios
}

/**
 * 是否为android设备
 * @returns {boolean|*}
 */
device.android = function () {
  return this.browser.versions.android
}

export default device
