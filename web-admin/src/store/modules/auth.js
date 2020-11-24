import constant from '../../constant';
import cookie from '../../core/cookie';

/**
 * 认证模块
 */
const moduleAuth = {
	'state': {
		'isLogin': false,
		'bodyHight': 'auto',
		'user': { // 用户登录信息
      UserName: '',
      RealName: ''
		}
	},
	'getters': {
		[constant.GET_IS_LOGIN]: state => {
			return state.isLogin;
		}
	},
	'mutations': {
		bodyHight (state, bodyHight) {
			state.bodyHight = bodyHight
		},
		[constant.GET_LOGIN_DATA]: state => {
			let userUserName = cookie.get(constant.LOGIN_DATA_USERNAME);
			let userRealName = cookie.get(constant.LOGIN_DATA_REALNAME);
			state.user.UserName = userUserName || state.user.UserName || '';
			state.user.RealName = userRealName || state.user.RealName || '';
		},
		[constant.SET_IS_LOGIN] (state, isLogin) {
			state.isLogin = isLogin;
		},
		[constant.SET_LOGIN_DATA] (state, user) {
			state.user = user;
			user.UserName ? state.isLogin = true && cookie.set(constant.LOGIN_DATA_USERNAME, user.UserName) : '';
			user.RealName ? state.isLogin = true && cookie.set(constant.LOGIN_DATA_REALNAME, user.RealName) : '';
		},
		[constant.DELETE_LOGIN_DATA] (state) {
			state.isLogin = false;
			cookie.remove(constant.LOGIN_DATA_USERNAME);
			cookie.remove(constant.LOGIN_DATA_REALNAME);
		}
	}
};

export default moduleAuth;
