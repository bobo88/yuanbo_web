// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './prototype';
// import myDebugger from './debugger';
import qs from 'qs'

import 'babel-polyfill';
import localStore from 'store';


import Vue from 'vue';
// 富文本编辑插件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)

// 国际化
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en'; //引入elemnentui中的语言  将其切换为中英文
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';

Vue.use(VueI18n);
/* ---------使用语言包----------- */
const messages = {
	'en': Object.assign({}, require('./assets/lang/en'), { ...enLocale }),
	'zh': Object.assign({}, require('./assets/lang/cn'), { ...zhLocale })
};
const i18n = new VueI18n({
	// locale语言标识（注意：为了在js中能切换语言，vue实例created时，会先对该属性进行改变操作，以便vue实例能监控$i18n.locale，实现对data默认属性的赋值）
	'locale': localStorage.getItem('language') ? localStorage.getItem('language') : 'en', // set locale
	messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value));


// const Vue = window.vue;
//引入echarts基本模板

let echarts = require('echarts/lib/echarts');

// 引入柱状图等组件
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');


// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');


import axios from './api/ajax';
import * as axiosAll from 'axios';
import router from './router';
import store from './store';
import api from './api';

import config from './config';
import constant from './constant';

import cookie from './core/cookie';
import GLOBAL from './core/global';

// element-ui组件样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import * as filters from './filters';
Vue.config.productionTip = false;
import App from './App';

// 注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

window.$messageBox = ElementUI.MessageBox;
window.$loading = ElementUI.Loading;
window.$alert = ElementUI.MessageBox.alert;
window.$confirm = ElementUI.MessageBox.confirm;
window.$prompt = ElementUI.MessageBox.prompt;
window.$notify = ElementUI.Notification;
window.$message = ElementUI.Message;
window.$cookie = cookie;
window.$GLOBAL = GLOBAL;


// 添加Vue的原型链(只读)
Object.defineProperty(Vue.prototype, '$axios', { 'value': axios });
Object.defineProperty(Vue.prototype, '$axiosAll', { 'value': axiosAll });
Object.defineProperty(Vue.prototype, 'Config', { 'value': config });
Object.defineProperty(Vue.prototype, 'Constant', { 'value': constant });
// Object.defineProperty(Vue.prototype, 'MyDebugger', { 'value': myDebugger });
Object.defineProperty(Vue.prototype, '$cookie', { 'value': cookie });

Object.defineProperty(Vue.prototype, 'Api', { 'value': api });
Object.defineProperty(Vue.prototype, '$filters', { 'value': filters });
Object.defineProperty(Vue.prototype, '$localStore', { 'value': localStore });
Object.defineProperty(Vue.prototype, '$echarts', { 'value': echarts });
Object.defineProperty(Vue.prototype, '$qs', { 'value': qs });


/**
 * 可修改
 */
/* Vue.prototype.$config = config */
Vue.prototype.$store = store;

// element-ui组件
Vue.prototype.$loading = ElementUI.Loading;
Vue.prototype.$MessageBox = ElementUI.MessageBox;
Vue.prototype.$alert = ElementUI.MessageBox.alert;
Vue.prototype.$confirm = ElementUI.MessageBox.confirm;
Vue.prototype.$prompt = ElementUI.MessageBox.prompt;
Vue.prototype.$notify = ElementUI.Notification;
Vue.prototype.$message = ElementUI.Message;
/* eslint-disable */
// 注册全局异常捕获器
// Vue.config.errorHandler = function (err, vm, info) {
//   myDebugger.log(arguments);
// }

/* eslint-disable no-new */
new Vue({
  el: document.getElementById('app'),
  i18n,
  router,
  store,
  render: h => h(App)
})
