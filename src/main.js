require('./bootstrap');
import Vue from 'vue'
import App from './App'
import router from './router'
import VueScrollTo from 'vue-scrollto'
import Scrollspy from 'vue2-scrollspy';
import './index.css'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css';
import Scrollactive from 'vue-scrollactive'
import Storage from 'vue-web-storage'
import Cookie from 'js-cookie'
import VueLocalStorage from 'vue-localstorage'


Vue.config.productionTip = false;
Vue.use(YDUI);
Vue.use(Scrollactive);
Vue.use(VueScrollTo);
Vue.use(Scrollspy);
Vue.use(Storage);
Vue.use(VueLocalStorage);

axios.interceptors.request.use(
	config => {
		if(Vue.$storage.get('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Accept = 'application/json';
			config.headers.Authorization = 'Bearer ' + Vue.$storage.get('token');
		}

		return config;
	}, err => {
		return Promise.reject(err);
	});

axios.interceptors.response.use(
	response => {
		if(response.status == 204) {
			// 返回 204 退出登陆成功返回登陆页面
			// window.location.reload();
		}
		return response;
	},
	error => {
		return Promise.reject(error); // 返回接口返回的错误信息
	});

//动态设置title
Vue.directive('title', {
	inserted: function(el, binding) {
		document.title = el.dataset.title
	}
});
 
// 接受地址栏参数
function GetQuery(key) {
	var search = window.location.href.split('#')[1];
	var arr = search.split("?");
	for(var i = 0; i < arr.length; i++) {
		var ar = arr[i].split("=");
		if(ar[0] == key) {
			if(unescape(ar[1]) == 'undefined') {
				return "";
			} else {
				return unescape(ar[1]);
			}
		}
	}
	return "";
}
// 获取个人信息
function getUserMessage(){
	if(Vue.$storage.get('userM')){
		console.log(Vue.$storage.get('userM'))
	}else {
		axios.get('/item/guest/profile')
		.then((res) => {
			console.log(res);
			Vue.$storage.set('userM', res.data.guest);
			Vue.$storage.set('messages_count', res.data.messages_count);
		}).catch((error) => {
			console.log(error)
		})
	}
}

router.beforeEach((to, from, next) => {
	console.log('to',to);
	console.log('from',from);
	console.log(to.path.substring(1).replace('/','_'))
	if(to.name == 'no_wechat'){
		return false;
	}
	if(Vue.$storage.get('token')) {
		next();
		getUserMessage();
	} else {
		if(Cookie.get('openid')) {
			console.log(1)
			return axios.post('/item/login', {
				openid: Cookie.get('openid')
			}).then(response => {
				//获取access_token
				console.log('login_success', response.data);
				getUserMessage();
				if(!response.data.status){
					alert(response.data.message);
				}else{
					Vue.$storage.set('token', response.data.token);
				}
				next();
			}).catch(error => {
				// alert(JSON.stringify(error))
				console.log('login_error', error);
				//加登陆失败代码

			});
		} else {
			Cookie.set('openid', GetQuery('openid'));
			if(Cookie.get('openid')) {
				return axios.post('/item/login', {
					openid: Cookie.get('openid')
				}).then(response => {
					//获取access_token
					console.log('login_success', response.data);
					getUserMessage();
					if(!response.data.status){
						alert(response.data.message)
					}else{
						Vue.$storage.set('token', response.data.token);
					}
					next();
				}).catch(error => {
					console.log('login_error', error);
					// alert(JSON.stringify(error));
					//加登陆失败代码

				});
			} else {
					// 本地
				if(to.name == 'home'){
					window.location.href = 'http://onlineducation-api.com/mobile/'+to.name;
				}else {
					window.location.href = 'http://onlineducation-api.com/mobile/'+to.path.substring(1).replace('/','_');
				}
			
				// 服务器
				// if(to.name == 'home'){
				// 	window.location.href = 'http://edu.elinkport.com/mobile/'+to.name;
				// }else {
				// 	window.location.href = 'http://edu.elinkport.com/mobile/'+to.path.substring(1).replace('/','_');
				// }
			}
		}
	}

	next();
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	// store,
	router,
	template: '<App/>',
	components: {
		App
	},
	localStorage: {
		searchclassdata: {
			type: Array,
			default: []
		},
		localhistory: {
			type: Array,
			default: []
		},
		currentTime: {
			type: Array,
			default: ['5']
		},
		indexData: {
			type: Object,
			default: '1'
		},
		advertData: {
			type: Array,
			default: []
		}
	}
});