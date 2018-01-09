<template>
	<div v-title data-title="微课堂会员">
		<div class="pay_top">
			<div class="left">
				<img :src="data.picture" class="pay_img" />
			</div>
			<div class="left">
				<p class="pay_p1">
					{{ data.nickname }}
					<yd-icon v-if="vipMarking == 3" class="pay_icon" name="icon-vimeo" custom size="0.3rem" color="#ff9800"></yd-icon>
				</p>
				<p class="pay_p2" v-if="vipMarking == 1 || vipMarking == 2">开通微课堂会员更多专属视频在等你！</p>
				<p class="pay_p2" v-if="vipMarking == 3">{{ data.vip_end_date }} 到期</p>
			</div>
			<div class="clear"></div>
		</div>
		<div class="select_pay">
			<p class="select_p">微课堂会员套餐</p>
			<div class="select_pay_content" v-for="item,key in orderData" :key="key" @click="vip_price(item,key)" :class="{'active':item.active}">
				<div class="left">
					<p class="select_content_p1">{{item.name}}</p>
					<p class="select_content_p2">{{item.describle}}</p>
				</div>
				<div class="right">
					<p class="select_right_p">￥<span>{{item.price}}</span></p>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="vip_freedom">
			<p class="vip_freedom_p">VIP专属特权</p>
			<yd-flexbox>
				<yd-flexbox-item class="vip_item_center">
					<yd-icon class="vip_icon" name="icon-filmstrip" custom size="0.54rem"></yd-icon>
					<span>专属视频</span>
				</yd-flexbox-item>
				<yd-flexbox-item class="vip_item_center">
					<yd-icon class="vip_icon" name="icon-movie" custom size="0.54rem"></yd-icon>
					<span>720P</span>
				</yd-flexbox-item>
				<yd-flexbox-item class="vip_item_center">
					<yd-icon class="vip_icon" name="icon-vimeo" custom size="0.54rem"></yd-icon>
					<span>尊贵标识</span>
				</yd-flexbox-item>
				<yd-flexbox-item class="vip_item_center">
					<yd-icon class="vip_icon" name="icon-dots-horizontal" custom size="0.54rem"></yd-icon>
					<span>敬请期待</span>
				</yd-flexbox-item>
			</yd-flexbox>
		</div>
		<div class="vip_freedom">
			<p class="buy_notes_p1">购买须知</p>
			<p class="buy_notes_p2">1、本服务为虚拟内容服务，购买前请谨慎阅读，一经购买，将不接受退款！！！</p>
		</div>
		<div class="pay_height"></div>
		<div class="pay_button" @click="paytest">
			<p>确认支付</p>
		</div>
	</div>
</template>

<script>
import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				vip: true,
				//用户基础信息
				data: {},
				// 可以购买的订单信息
				orderData: [],
				pay: null,
				wxconfig: {}
			}
		},
		computed: {
			// 判断显示的标记     1---代表没有开通过vip    2---开通过vip，但是已经过期了    3---开通了vip还未过期 
			vipMarking(){
				if(this.data.vip_name){
					let myDate = new Date();
					let vipDate = new Date(this.data.vip_end_date);
					if(myDate.getTime() > vipDate.getTime()){
						return 2
					}else {
						return 3;
						// return this.data.vip_end_date + ' 到期';
					}
				}else {
					return 1
				}
			}
		},
		methods: {
			vip_price(item, key) {
				let that = this　　　　　
				this.$nextTick(function() {　　　　　　　　
					this.orderData.forEach(function(item) {　　　　　　　　　　
						that.$set(item, 'active', false);
					})　　　　　　
					this.$set(item, 'active', true);　　　　　　
				})
				this.pay = item
			},
			getVipData() {
				axios.get('/item/vip/lists')
				.then((res) => {
					this.orderData = res.data
				})
				.catch((error) => {
					console.log(error);
				})
			},
			// 基础配置
			wx_config(){
				axios.post('/item/get_wechat_config',{
					'url' : window.location.href.split('#')[0]
				}).then((res) => {
					if(res.data.status){
						wx.config({
	 					    debug: false,
							appId: res.data.config.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
							timestamp: res.data.config.timestamp, // 必填，生成签名的时间戳
							nonceStr:  res.data.config.nonceStr, // 必填，生成签名的随机串
							signature: res.data.config.paySign,// 必填，签名，见附录1
	 					    jsApiList: ['chooseWXPay']
	 				   });
					}else{
						alert(res.data.message);
					}
 				}).catch((error) => {
 					console.log(error);
 				});
			},
 			paytest() {
 				let that = this;
 				if(!this.pay){
 					this.$dialog.alert({mes: '请选择套餐'});
 					return false;
 				}
 				
 					//处理验证失败的信息
 					wx.error(function (res) {
 						console.log('error',res);
 					});

 					//处理验证成功的信息
 					wx.ready(function () {
						axios.get('/item/order/'+that.pay.id+'/vip').then((res) => {
							console.log('order', res.data);
							if(res.data.status){
								wx.chooseWXPay({
									timestamp: res.data.config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
									nonceStr: res.data.config.nonceStr, // 支付签名随机串，不长于 32 位
									package: res.data.config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
									signType: res.data.config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
									paySign: res.data.config.paySign, // 支付签名
									success: function (res) {
										// 支付成功的回调函数
										if(res.errMsg == "chooseWXPay:ok") {
											axios.get('/item/guest/profile')
											.then((res) => {
												console.log(res);
												that.$storage.set('userM', res.data.guest);
												that.$storage.set('messages_count', res.data.messages_count);
												that.$router.push({name: 'vipsuccess'});
											}).catch((error) => {
												console.log(error)
											});
										}else {
											alert(JSON.stringify(res));
										}
									},
									cancel: function (res) {
										that.$dialog.notify({
						                    mes: '取消支付',
						                    timeout: 2000,
						                    callback: () => {
						                        console.log('我走咯！');
						                    }
						                });
									},
									fail:function(res){
								    	alert(JSON.stringify(res));
								    }
								});
							}else {
								alert(res.data.message);
							}
							
						});
 					 });
 			}
		},

		mounted() {
			// this.data = JSON.parse(window.localStorage.getItem('userMessage'));
			this.data = this.$storage.get('userM')
			this.getVipData();
			this.wx_config();
		}
	}
</script>
<style scoped>
	.pay_button {
		padding: .3rem;
		text-align: center;
		color: #ffffff;
		background-color: rgb(255, 121, 92);
		font-size: 14px;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.pay_height {
		height: 1.2rem;
	}

	.clear {
		clear: both;
	}

	.pay_top {
		background-color: #2c2d33;
		padding: .5rem;
	}

	.left {
		float: left;
	}

	.pay_img {
		width: 51px;
		border-radius: 50%;
	}

	.pay_p1 {
		margin-left: .2rem;
		color: #ffffff;
		font-size: 16.0px;
		margin-top: .1rem;
	}

	.pay_p2 {
		margin-left: .2rem;
		color: #ffffff;
		margin-top: .1rem;
	}

	.pay_p3 {
		margin-left: .2rem;
		color: #ffffff;
	}

	.pay_icon {
		margin-left: .1rem;
	}

	.vip_freedom {
		background: #ffffff;
		margin-top: .2rem;
		padding: .3rem .2rem .5rem .2rem;
	}

	.vip_freedom_p {
		font-size: 15.0px;
		color: #101010;
		margin-bottom: .35rem;
		margin-left: .4rem;
	}

	.vip_item_center {
		text-align: center;
	}

	.vip_icon {
		font-size: 0.54rem;
		display: block;
		color: #e6c087;
		width: 48px;
		height: 48px;
		margin: 0 auto;
		border-radius: 50%;
		background: #fff2e3;
	}

	.vip_icon:before {
		vertical-align: -webkit-baseline-middle;
	}

	.vip_item_center span {
		display: block;
		margin-top: .2rem;
	}

	.select_pay {
		background: #ffffff;
		padding: .5rem;
	}

	.select_p {
		font-size: 16.0px;
	}

	.select_pay_content {
		border: 1px solid #e3e3e3;
		border-radius: 6px;
		padding: .25rem;
		margin-top: .25rem;
	}

	.select_content_p1 {
		font-size: 15.0px;
	}

	.select_content_p2 {
		color: #b0b0b0;
		margin-top: .2rem;
	}

	.right {
		float: right;
	}

	.select_right_p {
		font-size: 18.0px;
		color: #ff6972;
		margin-top: .15rem;
	}

	.select_right_p span {
		font-size: 30px;
	}

	.active {
		background-color: #fff4f0;
		border: 1px solid #ff7c33;
	}

	.buy_notes_p1 {
		color: #a6a6a6;
		font-size: 16.0px;
	}

	.buy_notes_p2 {
		color: #a6a6a6;
		font-size: 13.0px;
		margin-top: .2rem;
	}
</style>