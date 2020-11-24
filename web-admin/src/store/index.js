import Vue from 'vue';
import Vuex from 'vuex';
import router from './modules/router';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'; // 是否开启严格模式

const store = new Vuex.Store({
	'modules': {
		'router': router,
		'auth': auth
	},
	'strict': debug
});

export default store;
