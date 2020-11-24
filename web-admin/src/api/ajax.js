/**
 *  网络请求底层封装：用于定制axios库
 */
import * as axios from 'axios';
import config from '../config';
import localStore from 'store';
import router from '../router';


/**
 * 取消请求控制器：在axios的实例化中完成初始化
 * @type {null}
 */
window.axiosCancelControl = null;
axios.defaults.baseURL = config.API_BASE_URL;
axios.defaults.timeout = 90 * 1000 * 2;

/**
 * axios实例：用于定制请求
 */
let instance = axios.create({
	'method': 'post', // 默认请求方法
	'responseType': 'json',

	'headers': {
		'Access-Control-Allow-Origin': '*'
		// 'Content-Type': 'application/json'
	},

	'onUploadProgress': function () {
	},
	/**
   * 指定取消Token，能够用来取消请求
   */
	'cancelToken': new axios.CancelToken(function (cancel) {
		window.axiosCancelControl = cancel;
	})
});
/**
 * 将取消请求控制器关联到axios实例中
 * @type {null}
 */

instance.cancel = function (message) {
	if (window.axiosCancelControl) {
		window.axiosCancelControl(message);
	}
};

/**
 * 请求发送之前的钩子：进行额外参数的封装
 *    应用相关信息：
 *        请求类型： ReqType: ''
 *        应用标识: AppKey： ''
 *    用户登录信息：User:{Id: '', Token: ''}
 */
instance.interceptors.request.use(reqConfig => {
	if (localStore) {
		reqConfig.headers['X-Auth-Value'] = localStore.get('token');
	}
	return reqConfig;
}, error => {
	return Promise.reject(error);
});

/**
 * 请求处理之前的钩子：进行响应结果的处理
 */
instance.interceptors.response.use(response => {
	window.response = response;
	let data = response.data;

	return data;
}, error => {
	// 抛出错误
	return Promise.reject(error);
});

/**
   * 请求错误处理
   * @param error
   */
instance.handleError = function (error, handleCallBack) {
	if (handleCallBack) {
		handleCallBack();
		return;
	}

	if(error.msg){
		if (parseInt(error.code) === 110000) {
			window.$confirm('Username or Password error! To register an account?', 'error', {
				'confirmButtonText': 'sure',
				'cancelButtonText': 'cancel',
				'type': 'warning'
			}).then(() => {
				window.open(config.API_REGISTER_URL);

			}).catch(() => {

			});
			return;
		}
		if (parseInt(error.code) === 110005) {
			window.$confirm('The server is not authorized for this account! To apply for permission?', 'error', {
				'confirmButtonText': 'sure',
				'cancelButtonText': 'cancel',
				'type': 'warning'
			}).then(() => {
				window.open(config.API_PERMISSION_URL);

			}).catch(() => {
			});
			return;
		}

		window.$messageBox({
			'message': String(error.msg)
		});

		if(parseInt(error.code) === 20001 || parseInt(error.code) === 101010){
			router.push({
				'name': 'login',
				'params': { 'urlType': 0 }
			});
		}

	}else{
		window.$messageBox({
			'message': String(error.message || error.msg)
		});
		router.push({
			'name': 'login',
			'params': { 'urlType': 0 }
		});
	}
	return;
};

export default instance;
