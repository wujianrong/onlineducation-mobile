<template>
	<div v-title data-title="我的VIP会员">
		<div class="my_vip">
			<div class="my_vip_top"></div>
			<div class="my_vip_ban"></div>
			<div class="my_vip_content">
				<div class="my_vip_img">
					<img :src="data.picture" />
				</div>
				<p class="my_vip_name">
					{{ data.nickname }}
				</p>

				<div v-if="vipMarking == '1'">
					<p class="my_vip_time">
						开通微课堂会员更多专属视频在等你！
					</p>
					<router-link to="vippay" class="my_vip_button">
						立即开通
					</router-link>
				</div>

				<div v-if="vipMarking == '2'">
					<p class="my_vip_time">
						开通微课堂会员更多专属视频在等你！
					</p>
					<router-link to="vippay" class="my_vip_button">
						立即续费
					</router-link>
				</div>

				<div v-if="vipMarking == '3'">
					<p class="my_vip_time">
						你的会员将于 {{ data.vip_end_date }} 到期
					</p>
					<router-link to="vippay" class="my_vip_button">
						立即续费
					</router-link>
				</div>
				
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data : {}
			}
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
			}
		},
		methods: {
		 
		},
		mounted() {
			// this.data = JSON.parse(window.localStorage.getItem('userMessage'))
			this.data = this.$storage.get('userM');
		}
	}
</script>
<style scoped>
	.my_vip {
		background: #fff;
		position: relative;
		padding-bottom: .4rem;
		overflow: hidden;
	}
	
	.my_vip_top {
		height: 55px;
		background: #2c2d33;
	}
	
	.my_vip_ban {
		height: 153px;
		background-color: #2c2d33;
		border-radius: 100%;
		width: 110%;
		position: absolute;
		top: -10px;
		left: -5%;
	}
	
	.my_vip_content {
		margin: 0 auto;
		width: 88%;
		position: relative;
		background: url(../../assets/vipbg.png);
		padding-bottom: .4rem;
		background-size: 100%;
		border-radius: 5px;
	}
	
	.my_vip_img {
		position: absolute;
		width: 76px;
		height: 76px;
		top: -40px;
		left: calc(50% - 38px);
	}
	
	.my_vip_img img {
		width: 77px;
		border-radius: 50%;
		border: 3px solid #ffe3ba;
	}
	
	.my_vip_name {
		font-size: 14.0px;
		color: #ffffff;
		padding-top: 1rem;
		text-align: center;
	}
	
	.my_vip_time {
		color: #ffffff;
		padding-top: .4rem;
		text-align: center;
	}
	
	.my_vip_button {
		color: #ffffff;
		width: 2rem;
		display: block;
		text-align: center;
		margin: 0 auto;
		margin-top: .4rem;
		padding: .15rem 0;
		border-radius: 100px;
		border: 1px solid #ffffff;
		font-size: 13.0px;
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
	.vip_item_center span{
		display: block;
		margin-top: .2rem;
	}
</style>