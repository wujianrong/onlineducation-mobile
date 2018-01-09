<template>
	<div v-title data-title="系统消息">
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
			<div class="sys_message" v-for="item,key in data" :key="key" slot="list">
				<div class="sys_time">
					<p>{{item.created_at}}</p>
				</div>
				<div class="sys_content" :class="item.type == 1 ? 'active' : ''" @click="gomessagedetails(item.id)">
					<div class="sys_content_top">
						<p class="sys_content_top_p1">{{item.title}}</p>
						<p class="sys_content_top_p2" v-html="item.content"></p>
					</div>
					<div class="sys_content_bottom">
						<div class="check_content">
							<span>查看详情</span>
						</div>
						<div class="check_right">
							<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#b0b0b0" custom size="0.34rem"></yd-icon>
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
		<!--<v-loading v-show="loading_v"></v-loading>-->
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
			gomessagedetails(id) {
				this.$router.push({
					name: 'messagedetails',
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
				this.loading_v = true
				axios.get('/item/message/lists')
					.then((res) => {
						console.log(res)
						this.loading_v = false
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
			updateMessages_count() {
				axios.get('/item/guest/profile')
					.then((res) => {
						this.$storage.set('messages_count', res.data.messages_count);
					}).catch((error) => {
						console.log(error)
					})
			}
		},
		created() {
			this.updateMessages_count()
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style scoped>
	.sys_message {
		margin: 15px 20px;
	}
	
	.sys_time {
		width: 40%;
		margin: 0 auto;
		background-color: #cecece;
		padding: 5px;
		text-align: center;
		border-radius: 30px;
		color: #ffffff;
	}
	
	.sys_content {
		margin: 10px 0;
		background: #ffffff;
		border-radius: 6px;
	}
	
	.sys_content_top {
		padding: 0 10px;
	}
	
	.sys_content_top_p1 {
		font-size: 18.0px;
		padding: 10px 0;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.sys_content_top_p2 {
		margin-bottom: .5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		/*-webkit-line-clamp: 2;*/
		-webkit-box-orient: vertical;
		color: #707070;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.sys_content_bottom {
		display: flex;
		padding: 5px 10px;
		border-top: 1px solid #e3e3e3;
	}
	
	.check_content {
		flex: 1;
		font-size: 14.0px;
		color: #888888;
	}
	
	.active .sys_content_top_p1 {
		color: #888888;
	}
	
	.active .sys_content_top_p2 {
		color: #b0b0b0;
	}
	
	.all_nodata {
		width: 80%;
		margin: 0 auto;
		display: block;
		margin-top: 1rem;
	}
	
	.all_nop {
		color: #888888;
		text-align: center;
		font-size: 18.0px;
		margin-top: .5rem;
	}
</style>