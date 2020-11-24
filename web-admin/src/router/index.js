import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store/index';
import constant from '../constant/index';
import cookie from '@/core/cookie';
Vue.use(VueRouter);

let isHistory = process.env.NODE_ENV !== 'production';

isHistory = true;
// 主页面
import Mainer from '../pages/Mainer';
// 首页
import Home from '../pages/home/Home';

// ================================================================================
// 基础模块
/**
 * other 模块：（包含登录和404页）
 * @param r
 * @constructor
 */
const NotFound = r => require.ensure([], () => r(require('@/pages/NotFound.vue')), 'other');

const Login = r => require.ensure([], () => r(require('@/pages/Login.vue')), 'other');

/**
 * 页面组件与路由地址的对应关系
 * @type {*[]}
 */
const routes = [
	{
		'path': '/',
		'name': 'Mainer',
		'component': Mainer,
		'redirect': '/login',
		'children': [
			// 首页
			{
				'path': '/home',
				'name': 'Home',
				'component': Home
      },
      // 文章管理
			{
				'path': '/article-management',
				'component': () => import(/* webpackChunkName: "A" */ '../pages/article/Index.vue'),
				'name': 'ArticleManagement'
      },
      // 分类管理
			{
				'path': '/classification-management',
				'component': () => import(/* webpackChunkName: "B" */ '../pages/classification/Index.vue'),
				'name': 'ClassificationManagement'
      },
      // 评论管理
			{
				'path': '/comment-management',
				'component': () => import(/* webpackChunkName: "C" */ '../pages/comment/Index.vue'),
				'name': 'CommentManagement'
      }
		]
	},

	{
		'path': '/login',
		'name': 'login',
		'component': Login,
		'meta': {
			'isLoginPage': true
		}
	},
	{
		'path': '/cms/auth/notfound',
		'name': 'notfound',
		'component': NotFound,
		'meta': {
			'isNotFoundPage': true
		}
	}
];

const router = new VueRouter({
	'mode': 'hash',
	// linkActiveClass: 'page-active',
	'history': isHistory,
	'base': __dirname,
	'routes': routes
});
/**
 * 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于 等待中。
 *  to: Route: 即将要进入的目标 路由对象
 *  from: Route: 当前导航正要离开的路由
 *  next: Function: 一定要调用该方法来 resolve 这个钩子。
 */

router.beforeEach((to, from, next) => {
	window.document.title = 'yuanbo-web Admin';
	if (cookie.get('username') && cookie.get('username').length > 0) {
		let loginData = {};

		loginData.UserName = cookie.get('username');
		Store.commit(constant.SET_LOGIN_DATA, loginData);
	} else {
		if (to.name !== 'login') {
			router.push({
				'name': 'login',
				'params': { 'urlType': 0 }
			});
			return;
		}
	}

	let isLoginPage = to.meta.isLoginPage || false;

	Store.commit(constant.SET_IS_LOGIN_PAGE, isLoginPage);
	next();
});


export default router;
