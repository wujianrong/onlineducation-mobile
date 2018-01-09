<template>
	<div v-title data-title="收藏的课程">
		<yd-layout>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<div slot="list">
					<div class="collect">
						<div class="buyclass" v-for="item,key in data" :key="key">
							<div class="buy_content" @click="ordergoclass('details',item.id)">
								<div class="buy_img">
									<img :src="item.pictrue" />
								</div>
								<div class="buy_details">
									<p class="buy_details_p1">{{item.name}}</p>
									<p class="buy_details_p2">{{item.title}}</p>
									<div class="collect_delete">
										<p class="buy_details_p3">￥{{item.price}}</p>
									</div>
								</div>
								<div class="clear"></div>
							</div>
							<div @click="delete_collect(item.id,key)" class="collect_abso">
								<yd-icon name="icon-delete-forever" slot="icon" custom size="0.34rem" color="#888888" class="collect_icon"></yd-icon>
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
				data: [
					// {
					// 	id: '1',
					// 	orderimg: 'https://pro.modao.cc/uploads3/images/1298/12981729/raw_1506305855.jpeg',
					// 	ordername: '《进出口税则》海关实用手册',
					// 	subname: '海运直接退运货物申报',
					// 	col: '免费'
					// }, {
					// 	id: '2',
					// 	orderimg: 'https://pro.modao.cc/uploads3/images/1298/12981729/raw_1506305855.jpeg',
					// 	ordername: '《进出口税则》海关实用手册',
					// 	subname: '海运直接退运货物申报',
					// 	col: '免费'
					// }, {
					// 	id: '3',
					// 	orderimg: 'https://pro.modao.cc/uploads3/images/1298/12981729/raw_1506305855.jpeg',
					// 	ordername: '年VIP会员',
					// 	subname: '买一送一',
					// 	col: '免费'
					// }
				],
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
				axios.get('/item/lesson/collect_lessons')
					.then((res) => {
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
						this.$dialog.loading.close()
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
			delete_collect(id, key) {
				this.$dialog.confirm({
					mes: '真的要取消收藏吗?',
					opts: () => {
						axios.get('/item/lesson/' + id + '/collect')
							.then((res) => {
								if(res.data.status) {
									this.$dialog.toast({
										mes: res.data.message,
										timeout: 1500,
										icon: 'success'
									});
								} else {
									this.$dialog.toast({
										mes: res.data.message,
										timeout: 2500,
										icon: 'error'
									});
								}
							})
							.catch((error) => {
								console.log(error);
							})
						this.data.splice(key, 1);
					}
				})
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>
<style scoped>
	.clear {
		clear: both;
	}
	
	.buyclass {
		border-bottom: 1px solid #e3e3e3;
		margin-left: .25rem;
		padding: .3rem 0;
	}
	
	.buyclass:last-child {
		border-bottom: none;
	}
	
	.buy_img {
		float: left;
	}
	
	.right {
		float: right;
	}
	
	.buy_img img {
		height: 54px;
	}
	
	.buy_details {
		float: left;
		margin-left: .2rem;
		width: 65%;
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
		float: left;
	}
	
	.collect_icon {
		padding-top: 15px;
		display: block;
	}
	
	.collect {
		border-bottom: 1px solid #e3e3e3;
		border-top: 1px solid #e3e3e3;
		background: #ffffff;
	}
	
	.buy_content {
		float: left;
		width: 90%;
	}
	
	.collect_abso {
		float: left;
		width: 10%;
		margin-top: 22px;
		text-align: center;
	}
</style>