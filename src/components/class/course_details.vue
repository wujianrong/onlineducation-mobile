<template>
	<div v-title data-title="课程详情">
		<div v-show="!loading_v">
			<yd-flexbox class="course_flexbox">
				<yd-flexbox-item class="course_item" v-for="item,key in nav" :key="key" :class="{active:scrollPos == item.scrollPos}">
					<span @click="$scrollTo(item.scrollPos)">{{item.name}}</span>
				</yd-flexbox-item>
			</yd-flexbox>
			<div v-scroll-spy="scrollPos" ref="container">
				<div class="class_top">
					<coursenode v-if="!loading_v" :data_class="data" :time_length="time_length" :timeall="timeall" :watchNumber="watchNumber" :collect_is="collect" @buycourse="paytest"></coursenode>
				</div>
				<div class="class_point">
					<coursepoint v-if="!loading_v" :data_class="data"></coursepoint>
				</div>
				<div class="class_introduce">
					<courseintroduce v-if="!loading_v" :data_class="data"></courseintroduce>
				</div>
				<div class="class_comment">
					<coursecomment v-if="!loading_v" :coudata="data"></coursecomment>
				</div>
			</div>
			<div class="class_gotovideo">
				<div class="class_goleft" v-if="data.type == '免费课程'">
					<p class="class_goleft_p1">{{data.type}}</p>
					<p class="class_goleft_p2">马上学习海量知识在等你</p>
				</div>
				<div class="class_goleft" v-if="data.type == 'VIP课程'">
					<p class="class_goleft_p1">VIP课程专属课程</p>
					<p class="class_goleft_p2">开通vip解锁全部{{data.sections.length}}节课程</p>
				</div>
				<div class="class_goleft" v-if="data.type == '付费课程'">
					<p class="class_goleft_p1">￥{{data.price}}</p>
					<p class="class_goleft_p2">购买课程解锁全部{{data.sections.length}}节课程</p>
				</div>
				<div class="class_goright">
					<div class="class_away" @click="determine(comeClass)" ref="class_away_ref">
						<p>{{comeClass}}</p>
					</div>
					<div class="class_zan" @click="clickzan" :class="{ active: isActive || data.is_like == 1 }">
						<yd-icon class="class_icon" name="icon-thumb-up" custom size="0.35rem"></yd-icon>
						<p>{{data.like}}赞</p>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<v-loading v-show="loading_v"></v-loading>
	</div>
</template>

<script>
	import coursenode from './course/course_node.vue'
	import coursepoint from './course/course_point.vue'
	import courseintroduce from './course/course_introduce.vue'
	import coursecomment from './course/course_comment.vue'
	import vloading from '../loading/loading'
	import wx from 'weixin-js-sdk'
	export default {
		components: {
			coursenode,
			coursepoint,
			courseintroduce,
			coursecomment,
			'v-loading': vloading
		},
		created() {
			this.getData()
		},
		data() {
			return {
				scrollPos: 0,
				nav: [{
					scrollPos: 0,
					name: '课程'
				}, {
					scrollPos: 1,
					name: '知识点'
				}, {
					scrollPos: 2,
					name: '介绍'
				}, {
					scrollPos: 3,
					name: '点评'
				}],
				zan: '0',
				isActive: false,
				loading_v: false,
				data: [],
				timesarray: [],
				time_length: '',
				timeall: '',
				watchNumber: 0,
				collect: '',
				comeClass: '',
				nowClass: '', //当前页面的课程名称
			}
		},
		methods: {
			clickzan() {
				if(this.data.is_like == 0 && this.isActive == false) {
					axios.get('/item/lesson/' + this.$route.params.id + '/like')
						.then((res) => {
							this.isActive = true
							this.data.like = res.data.like_count
						})
				}
			},
			getData() {
				this.loading_v = true
				axios.get('/item/lesson/' + this.$route.params.id + '/edit')
					.then((res) => {
						this.data = res.data;
						this.nowClass = res.data.name;
						this.class_away()
						console.log(res)
						this.loading_v = false
						this.$dialog.loading.close()
						this.time_length = res.data.sections.length
						res.data.sections.forEach((item) => {
							this.timesarray.push(item.video.duration)
						})
						this.watchNumber = res.data.play_times
						if(res.data.is_collect == 1) {
							this.collect = "icon-star"
						} else {
							this.collect = "icon-star-outline"
						}
						this.timeall = this.addTimes(this.timesarray)
						this.scrollPos = 0
						this.$nextTick(function() {
							window.scrollTo(0, 1)
							window.scrollTo(0, 0)
						})
						this.wx_config();
					})
			},
			// 计算总时长
			addTimes(timesarray) {
				// this.videotimes = null;
				let h = null;
				let m = null;
				let s = null;
				let nh = null;
				let nm = null;
				let ns = null;
				let nfen = null;
				let nmiao = null;
				for(let i = 0; i < timesarray.length; i++) {
					// alert(typeof timesarray[i].split('时')[0])
					h += parseInt(timesarray[i].split('时')[0]);
					m += parseInt(timesarray[i].split('时')[1].split('分')[0]);
					s += parseInt(timesarray[i].split('分')[1].split('秒')[0]);
				}
				ns = s % 60;
				m = m + Math.floor(s / 60);
				nm = m % 60;
				nh = h + Math.floor(m / 60);
				nfen = nm / 60
				nh = parseFloat(nh) + parseFloat(nfen)
				nmiao = ns / 3600
				nh = parseFloat(nh) + parseFloat(nmiao)
				nh = nh.toFixed(2)
				return nh + '小时';
			},
			class_away() {
				let user = this.$storage.get('userM')
				if(this.data.status == '已下架') {
					this.$refs.class_away_ref.style.backgroundColor = "#999999"
					this.comeClass = '课程已下架'
				} else {
					if(this.data.type == '免费课程') {
						let learned = false
						this.data.sections.forEach((item) => {
							if(item.is_last_learned == 1) {
								learned = true
							}
						})
						if(learned == true) {
							this.comeClass = '继续学习'
						} else {
							this.comeClass = '马上学习'
						}
					}
					if(this.data.type == 'VIP课程') {
						if(this.data.is_show == 1) {
							let learned = false
							this.data.sections.forEach((item) => {
								if(item.is_last_learned == 1) {
									learned = true
								}
							})
							if(learned == true) {
								this.comeClass = '继续学习'
							} else {
								this.comeClass = '马上学习'
							}
						} else {
							this.comeClass = '开通VIP'
						}
					}
					if(this.data.type == '付费课程') {
						if(this.data.is_show == 1) {
							let learned = false
							this.data.sections.forEach((item) => {
								if(item.is_last_learned == 1) {
									learned = true
								}
							})
							if(learned == true) {
								this.comeClass = '继续学习'
							} else {
								this.comeClass = '马上学习'
							}
						} else {
							this.comeClass = '购买课程'
						}
					}
				}
			},
			determine(item) {
				if(item == '马上学习') {
					let id = this.data.sections[0].id
					this.$router.push({
						name: 'showclass',
						params: {
							id
						}
					})
				}
				if(item == '开通VIP') {
					this.$router.push({
						name: 'vippay'
					})
				}
				if(item == '购买课程') {
					this.paytest()
				}
				if(item == '继续学习') {
					let id = 0
					this.data.sections.forEach((item) => {
						if(item.is_last_learned == 1) {
							id = item.id
						}
					})
					this.$router.push({
						name: 'showclass',
						params: {
							id
						}
					})
				}
			},
			// 基础配置
			wx_config() {
				let that = this;
				axios.post('/item/get_wechat_config', {
					'url': window.location.href.split('#')[0]
				}).then((res) => {
					if(res.data.status == true) {
						wx.config({
							debug: false,
							appId: res.data.config.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
							timestamp: res.data.config.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.config.nonceStr, // 必填，生成签名的随机串
							signature: res.data.config.paySign, // 必填，签名，见附录1
							jsApiList: ['chooseWXPay', 'onMenuShareAppMessage']
						});
						wx.ready(function() {
							// 分享给朋友
							wx.onMenuShareAppMessage({
								title: '给你推荐一节好课', // 分享标题
								desc: that.nowClass, // 分享描述
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: '../../assets/logo.png', // 分享图标    现在还没有图标，先注释掉
								success: function() {
									alert('分享成功')
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
									alert('取消分享')
								}
							});
							// 分享到朋友圈
							wx.onMenuShareTimeline({
								title: '给你推荐一节好课', // 分享标题
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: '../../assets/logo.png', // 分享图标
								success: function() {
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
								}
							});
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			paytest() {
				let that = this;
				//处理验证失败的信息
				wx.error(function(res) {
					console.log('error', res);
				});
				//处理验证成功的信息
				wx.ready(function() {
					axios.get('/item/order/' + that.$route.params.id + '/lesson').then((res) => {
						if(res.data.status == true) {
							wx.chooseWXPay({
								timestamp: res.data.config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: res.data.config.nonceStr, // 支付签名随机串，不长于 32 位
								package: res.data.config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
								signType: res.data.config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								paySign: res.data.config.paySign, // 支付签名
								success: function(res) {
									// 支付成功的回调函数
									if(res.errMsg == "chooseWXPay:ok") {
										that.$router.push({
											name: 'lessonsuccess'
										})
									} else {
										alert(JSON.stringify(res));
									}
								},
								cancel: function(res) {

								},
								fail: function(res) {
									alert(JSON.stringify(res));
								}
							});
						}
					});
				});
			}
		},
		computed: {

		},
		mounted() {

			this.$refs.container.style.position = "relative"
			this.$refs.container.style.top = ".8rem"
		},
		watch: {

		}
	}
</script>

<style scoped>
	.clear {
		clear: both;
	}
	
	.course_flexbox {
		position: fixed;
		width: 100%;
		background: #FFFFFF;
		font-size: 14px;
		z-index: 999;
		height: .8rem;
	}
	
	.course_item {
		text-align: center;
		padding: .25rem 0;
	}
	
	.course_flexbox .active span {
		color: #3595FF;
		position: relative;
	}
	
	.course_flexbox .active span:before {
		font-family: "iconfont" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		content: "\ea5c";
		position: absolute;
		left: -.3rem;
		top: .03rem;
	}
	
	.class_gotovideo {
		position: fixed;
		width: 100%;
		bottom: 0;
		background: #fff;
		border-top: 1px solid #e3e3e3;
		padding: .1rem .2rem;
	}
	
	.class_goleft {
		float: left;
	}
	
	.class_goleft_p1 {
		color: rgb(229, 28, 35);
		font-size: 16px;
	}
	
	.class_goleft_p2 {
		color: rgb(176, 176, 176);
		font-size: 10px;
	}
	
	.class_goright {
		float: right;
	}
	
	.class_away {
		float: right;
		padding: .2rem .6rem;
		color: rgb(255, 255, 255);
		background-color: rgb(66, 176, 255);
		border-radius: 4px;
	}
	
	.class_zan {
		float: right;
		text-align: center;
		margin-right: .2rem;
		color: #9c9c9c;
	}
	
	.class_zan.active {
		color: #ff6e76;
	}
</style>