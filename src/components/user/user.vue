<template>
	<div>
	<div v-title data-title="个人中心" v-show="!loading_v">
		<div class="user">
			<router-link to="edituser">
				<div class="userxin">
					<div class="userimg">
						<img :src="data.picture" />
					</div>
					<div class="username">
						<p class="username_p1">{{ data.nickname }}</p>
						<p class="username_p2"  v-if="vipMarking =='3'">
							<i class="iconfont icon-vimeo" style="font-size:12px;"></i>
							<!-- <yd-icon name="icon-vimeo" slot="icon" color="#ffffff" custom size="0.34rem" class="uservip"></yd-icon> -->
							<span>微课堂会员</span>
						</p>
						<p class="username_p2"  v-else="vipMarking =='3'">
							<!-- <yd-icon name="icon-vimeo" slot="icon" color="#ffffff" custom size="0.34rem" class="uservip"></yd-icon> -->
							<i class="iconfont icon-yonghu" style="font-size:12px;"></i>
							<span>普通会员</span>
						</p>
					</div>
				</div>
				<div class="user_right">
					<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ffffff" custom size="0.64rem"></yd-icon>
				</div>
				<div class="clear"></div>
			</router-link>
		</div>
		<div class="user_myvip">
			<router-link to="myvip">
				<div class="left">
					<p>
						<yd-icon name="icon-vimeo" slot="icon" color="#f0bc59" custom size="17px" class="uservip_myicon"></yd-icon>我的VIP会员
					</p>
				</div>
				<div class="right">
					<div class="time">
						<span  v-if="vipMarking =='1'">立即开通</span>
						<span  v-if="vipMarking =='2'">立即续费</span>
						<span  v-if="vipMarking =='3'">{{ data.vip_end_date }} 到期</span>
						<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
					</div>
				</div>
				<div class="clear"></div>
			</router-link>
		</div>
		<div class="user_myvip_more">
			<div class="user_ko">
				<router-link to="buyclass">
					<div class="left">
						<p>
							<yd-icon name="icon-ic_shopping_cart" slot="icon" color="#fc992c" custom size="17px" class="uservip_myicon"></yd-icon>购买记录
						</p>
					</div>
					<div class="right">
						<div class="time">
							<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
						</div>
					</div>
					<div class="clear"></div>
				</router-link>
			</div>
			<div class="user_ko">
				<router-link to="collectclass">
					<div class="left">
						<p>
							<yd-icon name="icon-star" slot="icon" color="#ffd230" custom size="17px" class="uservip_myicon"></yd-icon>收藏的课程
						</p>
					</div>
					<div class="right">
						<div class="time">
							<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
						</div>
					</div>
					<div class="clear"></div>
				</router-link>
			</div>
			<div class="user_ko">
				<router-link to="/sysmessage">
					<div class="left">
						<p>
							<yd-icon name="icon-ic_mail" slot="icon" color="#008fe0" custom size="17px" class="uservip_myicon"></yd-icon>消息中心
						</p>
					</div>
					<div class="right">
						<div class="time">
							<yd-badge  v-if="messages_count != 0" type="danger" class="white">{{ badgeted }}</yd-badge>
							<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
						</div>
					</div>
					<div class="clear"></div>
				</router-link>
			</div>
			<div class="user_ko">
				<router-link to="/writefeedback">
					<div class="left">
						<p>
							<yd-icon name="icon-comment-processing" slot="icon" color="#2BCF44" custom size="17px" class="uservip_myicon"></yd-icon>意见反馈
						</p>
					</div>
					<div class="right">
						<div class="time">
							<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
						</div>
					</div>
					<div class="clear"></div>
				</router-link>
			</div>
		</div>
		<bottomnav :user="user"></bottomnav>
	</div>
</div>
</template>

<script>
	import bottomnav from '../common/Bottom_nav.vue'
	import vloading from '../loading/loading'
	export default {
		name: 'app',
		data() {
			return {
				user: true,
				data : {},
				loading_v: false,
				messages_count:null
			}
		},
		components: {
			bottomnav,
			'v-loading': vloading
		},
		computed: {
			// 判断显示的标记     1---代表没有开通过vip    2---开通过vip，但是已经过期了    3---开通了vip还未过期 
			vipMarking(){
				if(this.data.vip_name){
					let myDate = new Date();
					let vipDate = new Date(this.data.vip_end_date);
					if(myDate.getTime() > vipDate.getTime()){
						return '2'
					}else {
						return '3';
					}
				}else {
					return '1'
				}
			},
			badgeted(){
				if(this.messages_count > 99){
					return '99+'
				}else{
					return this.messages_count
				}
			}
		},
		methods: {
	
		},
		mounted() {
			if(this.$storage.get('userM')){
				this.data = this.$storage.get('userM');
				this.messages_count = this.$storage.get('messages_count');
			}else{
				axios.get('/item/guest/profile')
				.then((res) => {
					console.log(res);
					this.data = res.data.guest;
					this.messages_count = res.data.messages_count;
				}).catch((error) => {
					console.log(error)
				})
			}
		}
	}
</script>
<style scoped>
	.clear {
		clear: both;
	}
	
	.user {
		padding: .4rem .2rem .4rem .4rem;
		background: url(../../assets/userbg.png);
		background-size: 100%;
	}
	
	.userimg {
		float: left;
	}
	
	.userimg img {
		border-radius: 40px;
		width: 68px;
	}
	
	.username {
		float: left;
		color: #fff;
		margin-left: 20px;
		margin-top: 5px;
	}
	
	.white {
		color: #FFFFFF !important;
	}
	
	.username_p1 {
		font-size: 16.0px;
	}
	
	.username_p2 {
		margin-top: 5px;
		padding: 2px 8px;
		border: 1px solid #fff;
		border-radius: 30px;
	}
	
	.user_right {
		float: right;
		margin-top: 20px;
	}
	
	.uservip {
		vertical-align: middle;
	}
	
	.user_myvip {
		padding: .1rem .2rem .1rem .4rem;
		background: #ffffff;
		margin-top: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.left {
		float: left;
	}
	
	.left p {
		font-size: 16.0px;
		line-height: 36px;
	}
	
	.uservip_myicon {
		vertical-align: middle;
		margin-right: .2rem;
	}
	
	.right {
		float: right;
	}
	
	.time span {
		color: #e2c07d;
	}
	
	.user_myvip_more {
		background: #ffffff;
		margin-top: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko {
		margin-left: .4rem;
		padding: .1rem .2rem .1rem 0;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko:last-child {
		border-bottom: none;
	}
</style>