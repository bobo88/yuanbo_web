/**
 * Cookie
 * @type {{}}
 */
let cookie = {};

/**
 * 设置
 * @param name
 * @param value
 * @param expHour
 * @param domain
 * @param path
 */
cookie.set = function (name, value, expHour, domain, path) {
	document.cookie = name + '=' + encodeURIComponent(value === undefined ? '' : value) + (expHour ? '; expires=' + new Date(new Date().getTime() + (expHour - 0) * 3600000).toUTCString() : '') + '; domain=' + (domain || document.domain) + '; path=' + (path || '/');
	return this;
};

/**
 * 获取
 * @param name
 * @returns {*}
 */
cookie.get = function (name) {
	return document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)')) === null ? null : decodeURIComponent(RegExp.$2);
};

/**
 * 删除
 * @param name
 */
cookie.remove = function (name) {
	if (this.get(name) != null) {
		this.set(name, null, -1)
		;
	}
	return this;
};

export default cookie;
