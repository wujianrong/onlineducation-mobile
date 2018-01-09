import Vue from 'vue'
import Router from 'vue-router'
const parentComponent = {
	template: '<router-view></router-view>'
}
Vue.use(Router)

export default new Router({
	// mode: 'history',
	routes: [{
		path: '',
		component: parentComponent,
		children: [
		    // 首页
			{
				path: '',
				name: 'home',
				component: resolve => require(['../components/index/index.vue'], resolve),

			},
			// 当前页面只是用来作为判断是否是微信浏览器打开的浏览器
			{
				path: 'no_wechat',
				name: 'no_wechat',
				component: resolve => require(['../components/index/no_wechat.vue'], resolve),

			},
			// 后台预览课程详情
			{
				path: 'preview/:id',
				name: 'preview',
				component: resolve => require(['../components/class/preview.vue'], resolve),

			},
			// 会员中心首页
			{
				path: 'userall',
				component: parentComponent,
				children: [{
					path: 'user',
					name: 'user',
					component: resolve => require(['../components/user/user.vue'], resolve),

				}, {
					// 个人资料
					path: 'edituser',
					name: 'edituser',
					component: resolve => require(['../components/user/edituser.vue'], resolve),

				}, {
					// 绑定手机
					path: 'bindmobile',
					name: 'bindmobile',
					component: resolve => require(['../components/user/bindmobile.vue'], resolve),

				}, {
					// 购买记录
					path: 'buyclass',
					name: 'buyclass',
					component: resolve => require(['../components/user/buyclass.vue'], resolve),

				}, {
					// 收藏的课程
					path: 'collectclass',
					name: 'collectclass',
					component: resolve => require(['../components/user/collectclass.vue'], resolve),

				}, {
					// 我的VIP会员页面
					path: 'myvip',
					name: 'myvip',
					component: resolve => require(['../components/user/myvip.vue'], resolve),

				}, {
					// 微课堂会员购买页面
					path: 'vippay',
					name: 'vippay',
					component: resolve => require(['../components/user/vippay.vue'], resolve),

				}]
			}, {
				// 搜索课程页面
				path: 'search',
				name: 'search',
				component: resolve => require(['../components/search/search.vue'], resolve),

			},
			// vip支付成功
			{
				path: 'vipsuccess',
				name: 'vipsuccess',
				component: resolve => require(['../components/paysuccess/vipsuccess.vue'], resolve),

			},
			// 课程支付成功
			{
				path: 'lessonsuccess',
				name: 'lessonsuccess',
				component: resolve => require(['../components/paysuccess/lessonsuccess.vue'], resolve),

			}, {
				// 系统消息
				path: 'sysmessage',
				component: parentComponent,
				children: [{
					path: '',
					name: 'sysmessage',
					component: resolve => require(['../components/sysmessage/sysmessage.vue'], resolve),

				}, {
					// 消息详情
					path: 'messagedetails/:id',
					name: 'messagedetails',
					component: resolve => require(['../components/sysmessage/messagedetails.vue'], resolve),

				}]
			}, {
				// 课程栏目页面
				path: 'class/:id',
				name: 'class',
				component: resolve => require(['../components/class/class.vue'], resolve),

			}, {
				// 视频播放页面
				path: 'showclass/:id',
				name: 'showclass',
				component: resolve => require(['../components/class/showclass.vue'], resolve),

			}, {
				// 课程详情页面
				path: 'details/:id',
				name: 'details',
				component: resolve => require(['../components/class/course_details.vue'], resolve),

			}, {
				// 评论页面
				path: 'morecomment/:id',
				name: 'morecomment',
				component: resolve => require(['../components/class/more_comment.vue'], resolve),

			}, {
				// 点评页面
				path: 'writecomment/:id',
				name: 'writecomment',
				component: resolve => require(['../components/class/write_comment.vue'], resolve),

			}, {
				// 学习记录页面
				path: 'learning',
				name: 'learning',
				component: resolve => require(['../components/learning/learning_records.vue'], resolve),

			}, {
				// 意见反馈页面
				path: 'writefeedback',
				name: 'writefeedback',
				component: resolve => require(['../components/class/write_feedback.vue'], resolve),

			}
		]
	}],
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})