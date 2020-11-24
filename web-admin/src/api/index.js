
import ajax from './ajax';
import router from '../router';
import localStore from 'store';


let Api = {

	'ajax': ajax,

	handleError (error={},handleCallBack='') {
		return ajax.handleError(error,handleCallBack);
	},


	/**
   * 后台管理登录
   */
	login (optionsData) {
		return ajax.post('/login', optionsData);
	},
	/**
   * 后台管理登录
   */
	logout (optionsData) {
		return ajax.post('/logout', optionsData);
	},
	/**
   * 首页数据
   */
	getinfoIndex () {
		return ajax.post('index/getinfo');
  },
  // ********************************************** 文章管理 ******************************************************************
	// 获取实习达人列表
	internGetinfo (optionsData) {
		return ajax.post('intern/getinfo',optionsData);
	},
  // ********************************************** 分类管理 ******************************************************************
	// 获取实习达人列表
	internGetinfo (optionsData) {
		return ajax.post('intern/getinfo',optionsData);
	},
  // ********************************************** 评论管理 ******************************************************************
	// 根据ID获取评论列表
	getCommentsById (optionsData) {
    return ajax.get('comment/list', {
			'params':optionsData
		});
  },
	// 根据分页获取评论列表
	getCommentsByPage (optionsData) {
    return ajax.post('comment/list', optionsData);
  },
	// 编辑评论
	updateComment (optionsData) {
    return ajax.post('comment/edit', optionsData);
  },
	// 删除评论
	deleteComment (optionsData) {
    return ajax.post('comment/delete', optionsData);
  },
  
  // ********************************************** 其他 ******************************************************************
	//获取实习达人列表
	internGetinfo (optionsData) {
		return ajax.post('intern/getinfo',optionsData);
	},
	//审核实习达人
	internAudit (optionsData) {
		return ajax.post('intern/audit',optionsData);
	},
	//新增实习达人
	internAdd (optionsData) {
		return ajax.post('intern/add',optionsData);
	},
	//更新实习达人
	internUpdate(optionsData) {
		return ajax.post('intern/update',optionsData);
	},
	//实习达人复审
	internRecheck(optionsData) {
		optionsData.Authorization = localStore.get('token');
		return ajax.get('intern/recheck',{
			'params':optionsData
		});
	},
	//删除实习达人
	internDelete(optionsData) {
		optionsData.Authorization = localStore.get('token');
		return ajax.get('intern/delete', {
			'params':optionsData
		});
	},

	//获取签约达人列表
	formalGetinfo (optionsData) {
		return ajax.post('formal/getinfo',optionsData);
	},

	//新增实习达人列表
	formalAdd (optionsData) {
		return ajax.post('formal/add',optionsData);
	},
	//更新实习达人
	formalUpdate(optionsData) {
		return ajax.post('formal/update',optionsData);
	},
	//删除签约达人
	formalDelete(optionsData) {
		optionsData.Authorization = localStore.get('token');
		return ajax.get('formal/delete',{
			'params':optionsData
		});
	},
	//下载达人信息列表
	formalDownload (optionsData) {
		return ajax.post('download/template/formal',optionsData,{
			'responseType': 'blob' // important
		});
	},
	//获取达人数据结算列表
	formalDataGetinfo (optionsData) {
		return ajax.post('data/getinfo',optionsData);
	},
	//获取达人数据结算列表
	formalDataDownload (optionsData) {
		return ajax.post('export/formal/data',optionsData,{
			'responseType': 'blob' // important
		});
	}
};


Api.allApiEntry = function (sigleApi, param) {
	return new Promise(function(resolve){
		Api[sigleApi](param).then((responseData) => {

			resolve(responseData);
		}).catch((error) => {
			Api.handleError(error);
			if (sigleApi === 'login') {
				router.push({
					'name': 'login',
					'params': { 'urlType': 0 }
				});
			}


		});
	});
};


export default Api;