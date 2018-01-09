<template>
	<div v-title data-title="购买记录">
		<yd-layout>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<div slot="list">
					<div class="buyclass" v-for="item,key in data" :key="key" @click="class_item_buy(item)">
						<div class="buy_order">
							<div class="left">
								<p class="font_size14">订单号：{{item.order_no}}</p>
							</div>
							<div class="right">
								<p class="font_size14 gray_success">{{item.status}}</p>
							</div>
							<div class="clear"></div>
						</div>
						<!-- item.type == 1  课程订单 -->
						<div class="buy_content" v-if="item.pictrue">
							<div class="buy_img">
								<img class="orderPicture" :src="item.pictrue" />
							</div>
							<div class="buy_details">
								<p class="buy_details_p1">{{item.name}}</p>
								<p class="buy_details_p2">{{item.title}}</p>
								<p class="buy_details_p3">￥{{item.price}}</p>
							</div>
							<div class="clear"></div>
						</div>
						<!-- item.type == 2  vip订单 -->
						<div class="buy_content" v-else="item.pictrue">
							<div class="buy_img">
								<img class="orderPicture" src="../../assets/vip.png"/>
							</div>
							<div class="buy_details">
								<p class="buy_details_p1">{{item.name}}</p>
								<p class="buy_details_p2">{{item.title}}</p>
								<p class="buy_details_p3">￥{{item.price}}</p>
							</div>
							<div class="clear"></div>
						</div>


						<div class="buy_bottom">
							<div class="left">
								<p>创建时间：{{item.created_at}}</p>
							</div>
							<div class="right">
								<span class="buy_goto" @click="ordergoclass('details',item.order_type_id)" v-if="item.pictrue">马上学习</span>
								<span class="buy_goto" @click="ordergovip('myvip')" v-if="!item.pictrue">查看会员特权</span>
							</div>
							<div class="clear"></div>
						</div>
					</div>
				</div>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">没有更多内容</span>
				<!-- 加载中提示，不指定，将显示默认加载中图标 -->
				<div slot="loadingTip">
					<loading></loading>
				</div>
			</yd-infinitescroll>
			<nodata v-if="nomessageshow"></nodata>
			<v-loading v-show="loading_v"></v-loading>
		</yd-layout>
	</div>
</template>

<script>
	import loading from '../common/loading'
	import nodata from '../common/NoData'
	import vloading from '../loading/loading'
	export default {
		components: {
			loading,
			'v-loading': vloading,
			nodata
		},
		data() {
			return {
				data: [],
				next: '',
				nomessageshow: false,
				loading_v: false
			}
		},
		methods: {
			loadList() {
				axios.get(this.next)
					.then((res) => {
						console.log(res)
						const _list = res.data.data;
						this.data = [...this.data, ..._list];
						if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.next = res.data.links.next
					})
					.catch((error) => {
						console.log(error);
					});
			},
			getData() {
				this.loading_v = true
				axios.get('/item/lesson/pay_orders')
					.then((res) => {
						console.log(res)
						this.loading_v = false
						this.$dialog.loading.close()
						this.data = res.data.data
						if(this.data.length > 0) {
							this.nomessageshow = false
						} else {
							this.nomessageshow = true
						}
						if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.next = res.data.links.next
					})
					.catch((error) => {

					})
			},
			ordergoclass(url, id) {
				this.$router.push({
					name: url,
					params: {
						id
					}
				})
			},
			ordergovip(url) {
				this.$router.push({
					name: url
				})
			},
			class_item_buy(item){
				if(item.pictrue){
					this.ordergoclass('details',item.order_type_id)
				}else{
					this.ordergovip('myvip')
				}
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>
<style scoped>
	.orderPicture {
		width: 97px;
		height: 55px;
	}
	.clear {
		clear: both;
	}
	
	.buyclass {
		margin-top: .2rem;
		background: #ffffff;
		border-bottom: 1px solid #e3e3e3;
		border-top: 1px solid #e3e3e3;
	}
	
	.buy_order {
		padding: .25rem;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.left {
		float: left;
	}
	
	.font_size14 {
		font-size: 14px;
	}
	
	.right {
		float: right;
	}
	
	.gray_success {
		color: #259b24;
	}
	
	.buy_content {
		padding: .55rem .25rem;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.buy_img {
		float: left;
	}
	
	.buy_img img {
		height: 54px;
	}
	
	.buy_details {
		float: left;
		margin-left: .2rem;
		width: 60%;
	}
	
	.buy_details_p1 {
		font-size: 16.0px;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.buy_details_p2 {
		color: #b0b0b0;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.buy_details_p3 {
		color: #e51c23;
	}
	
	.buy_bottom {
		padding: .4rem .25rem;
	}
	
	.buy_goto {
		padding: .15rem .3rem;
		border: 1px solid #42b0ff;
		color: #42b0ff;
		border-radius: 4px;
		font-size: 14.0px;
	}
</style>