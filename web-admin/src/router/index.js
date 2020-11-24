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

// 企业文化
import CorporateCulture from '../pages/corporateCulture/index';
import OfficeEnvironment from '../pages/corporateCulture/OfficeEnvironment';
import Employees from '../pages/corporateCulture/Employees';
import OversealLife from '../pages/corporateCulture/OversealLife';

// 岗位管理
import Career from '../pages/career/index';
import JobOpenings from '../pages/career/JobOpenings';
import ClosedJobs from '../pages/career/ClosedJobs';
import OprateJob from '../pages/career/OprateJob';
// 新闻中心
import NewsContents from '../pages/newsContents/index';
import NewsList from '../pages/newsContents/NewsList';
// import CompanyNews from '../pages/newsContents/CompanyNews';
// import IndustryNews from '../pages/newsContents/IndustryNews';
import OprateNews from '../pages/newsContents/OprateNews';

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
      // 企业文化
			{
				'path': '/corporate-culture',
				'component': CorporateCulture,
				'name': 'CorporateCulture',
				'redirect': '/corporate-culture/office-environment',
				'children': [
          // 办公环境
          {
            path: 'office-environment',
            name: 'OfficeEnvironment',
            component: OfficeEnvironment
          },
          // 员工活动
          {
            path: 'employees',
            name: 'Employees',
            component: Employees
          },
          // 海外风采
          {
            path: 'overseal-life',
            name: 'OversealLife',
            component: OversealLife
          }
        ]
      },
      // 职业生涯
			{
				'path': '/career',
				'name': 'Career',
        'component': Career,
        'redirect': '/career/job-openings',
				'children': [
          // 职位空缺
          {
            path: 'job-openings',
            name: 'JobOpenings',
            component: JobOpenings
          },
          // 职位停招
          {
            path: 'closed-jobs',
            name: 'ClosedJobs',
            component: ClosedJobs
          },
          // 职位详情
          {
            path: 'job-detail',
            name: 'OprateJob',
            component: OprateJob
          }
        ]
			},
      // 新闻中心
			{
				'path': '/news',
				'name': 'NewsContents',
        'component': NewsContents,
        'redirect': '/news/news-list',
				'children': [
          // 公司新闻
          {
            path: 'news-list',
            name: 'NewsList',
            component: NewsList
          },
          // // 公司新闻
          // {
          //   path: 'company-news',
          //   name: 'CompanyNews',
          //   component: CompanyNews
          // },
          // // 行业新闻
          // {
          //   path: 'industry-news',
          //   name: 'IndustryNews',
          //   component: IndustryNews
          // },
          // 编辑OR新增新闻
          {
            path: 'oprate-news',
            name: 'OprateNews',
            component: OprateNews
          }
        ]
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
