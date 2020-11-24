
const GLOBAL = {
	// 去除首尾空格
	trimStr (str) {
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	// 去除首尾空格
	trimStrValidate (str) {
		return Object.prototype.toString.call(str) === '[object String]' && GLOBAL.trimStr(str) === '';
	},

	// 验证数字
	isNumber (arg) {
		let reg = /^\d+$/g;

		return reg.test(arg);
	}
};

export default GLOBAL;
