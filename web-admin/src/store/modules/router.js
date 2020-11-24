import constant from '../../constant';

/**
 * 路由模块
 */
const moduleRouter = {
	'state': {
		'isLoginPage': false,
		'tableHeaderCss': {'background': '#e6f7ff', 'color': '#333'},
		'tableHeight': 400
	},
	'getters': {
		[constant.GET_IS_LOGIN_PAGE]: state => {
			return state.isLoginPage;
		}
	},
	'mutations': {
		[constant.SET_IS_LOGIN_PAGE] (state, isLoginPage) {
			state.isLoginPage = isLoginPage;
		},
		setTableHeight(state, height) {
			state.tableHeight = height;
		}
	}
};

export default moduleRouter;
