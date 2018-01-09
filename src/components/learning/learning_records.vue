<template>
	<div v-title data-title="学习记录">
		<yd-layout>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<div slot="list">
					<div class="collect">
						<div class="buyclass" v-for="item,key in data" :key="key" @click="ordergoclass('details',item.id)">
							<div class="buy_content">
								<div class="buy_img">
									<img :src="item.pictrue" />
								</div>
								<div class="buy_details">
									<p class="buy_details_p1">{{item.name}}</p>
									<p class="buy_details_p2">最近学到：{{item.sections}}</p>
								</div>
								<div class="clear"></div>
							</div>
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
		<div class="height_55"></div>
		<div class="learning" v-if="lastShow" @click="ordergoclass('details',lastdata.id)">
			<div class="learning_img">
				<img :src="lastdata.pictrue" />
			</div>
			<div class="learning_class">
				<p class="learning_class_p1">{{ lastdata.name }}</p>
				<p class="learning_class_p2">{{ lastdata.sections }}</p>
			</div>
			<div class="learning_right">
				<yd-icon name="icon-play-circle-outline" slot="icon" custom size="0.54rem"></yd-icon>
			</div>
			<div class="clear"></div>
		</div>
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
				data:[],		//存放所有播放记录
				lastdata:{},   //存放上一次播放的记录
				// list: [{
				// 	id: '1',
				// 	orderimg: 'https://pro.modao.cc/uploads3/images/1298/12981729/raw_1506305855.jpeg',
				// 	ordername: '《进出口税则》海关实用手册',
				// 	subname: '1.QP的基础功能讲解'
				// }, {
				// 	id: '2',
				// 	orderimg: 'https://pro.modao.cc/uploads3/images/1298/12981729/raw_1506305855.jpeg',
				// 	ordername: '《进出口税则》海关实用手册',
				// 	subname: '1.QP的基础功能讲解'
				// }, {
				// 	id: '3',
				// 	orderimg: 'https://pro.modao.cc/uploads3/images/1298/12981729/raw_1506305855.jpeg',
				// 	ordername: '《进出口税则》海关实用手册',
				// 	subname: '1.QP的基础功能讲解'
				// }]
				nomessageshow: false,
				loading_v: false,
				lastShow: false
			}
		},
		methods: {
			ordergoclass(url, id) {
				this.$router.push({
					name: url,
					params: {
						id
					}
				})
			},
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
				// 有坑---------------------------------------------------------深坑，待后台数据格式化后再优化
				this.loading_v = true;
				axios.get('/item/lesson/learned_lessons')
					.then((res) => {
						console.log(res);
						this.loading_v = false
						this.$dialog.loading.close()
						// 1.  res.data.data[i].type == 1 判断如果type=1，就是课程订单
						// 2.  res.data.data[i].lesson.is_learned ==1   判断如果is_learned ==1 就是这个课程被学习过了，放到学习记录里面去
						this.data = res.data.data
						
						if(this.data.length > 0) {
							this.nomessageshow = false;
							this.lastShow = true;
							this.lastdata = this.data[0];
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
						this.loading_v = false
					})
			},

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
		margin-top: .3rem;
	}
	
	.buy_details_p3 {
		color: #e51c23;
		float: left;
	}
	
	.collect_icon {
		float: right;
	}
	
	.collect {
		border-bottom: 1px solid #e3e3e3;
		border-top: 1px solid #e3e3e3;
		background: #ffffff;
	}
	
	.learning {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: rgb(106, 106, 115);
		height: 54px;
	}
	
	.learning_img {
		float: left;
	}
	
	.learning_img img {
		height: 54px;
	}
	
	.learning_class {
		float: left;
		padding: .15rem;
		width: 58%;
	}
	
	.learning_class_p1 {
		color: #fff;
		font-size: 14px;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.learning_class_p2 {
		color: rgb(219, 219, 219);
		margin-top: .05rem;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.learning_right {
		float: right;
		padding: .23rem .1rem;
		color: #fff;
	}
	.height_55{
		height: 55px;
	}
</style>