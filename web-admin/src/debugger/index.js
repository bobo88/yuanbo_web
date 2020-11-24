import config from '@/config';

let isDebug = config.DEBUG;

let initDebugger = function () {
	window.myDebugger = {};
	for (var i in window.console) {
		if (typeof window.console[i] === 'function') {
			if (isDebug) {
				window.myDebugger[i] = window.console[i].bind(window.console);
			} else {
				window.myDebugger[i] = function () { };
			}
		}
	}
	return window.myDebugger;
};

let myDebugger = initDebugger();

// 定义状态可控制的日志工具
// let nullDebugger = []
// for (var i in window.console) {
//   if (typeof window.console[i] === 'function') {
//     nullDebugger[i] = function () { }
//   }
// }
// let newDebugger = function (debugState) {
//   if (debugState !== false) debugState = true
//   if (debugState) {
//     return myDebugger
//   } else {
//     return nullDebugger
//   }
// }

export default myDebugger;
