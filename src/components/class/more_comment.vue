<template>
	<div v-title data-title="精选点评">
		<div class="more_comment">
			<div class="show_more">
				<p>以下评论由后台精选后显示</p>
			</div>
			<div class="show_more_two">
				<p>如果觉得课程有益，欢迎留下您的看法</p>
			</div>
			<div class="share_comment" @click="share_comment">
				<yd-icon class="class_icon" name="icon-pencil" custom size="0.3rem" color="#289FE0"></yd-icon>
				<span>写点评</span>
			</div>
		</div>
		<div class="class_point">
			<div class="class_point_title">
				<span>精选评论 ({{comment_length}}条评论)</span>
			</div>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<div class="class_comment" v-for="item,key in data" :key="key" slot="list">
					<div class="class_comment_name">
						<img class="class_comment_img" :src="item.avatar" />
						<span class="class_comment_wxname">{{item.guest}}</span>
						<span class="class_comment_vip" v-if="item.is_vip == true"><yd-icon class="class_icon" name="icon-vimeo" custom size="0.3rem" color="#ff9800"></yd-icon></span>
					</div>
					<div class="class_comment_content">
						<p>{{item.content}}</p>
					</div>
				</div>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">没有更多内容</span>
				<!-- 加载中提示，不指定，将显示默认加载中图标 -->
				<div slot="loadingTip">
					<loading></loading>
				</div>
			</yd-infinitescroll>
		</div>
	</div>
</template>

<script>
	import loading from '../common/loading'
	export default {
		components: {
			loading
		},
		created() {

		},
		data() {
			return {
				data: [],
				next: '',
				loading_v: false,
				comment_length: ''
			}
		},
		methods: {
			share_comment() {
				let id = this.$route.params.id
				this.$router.push({
					name: 'writecomment',
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
				axios.get('/item/discusse/' + this.$route.params.id + '/lesson_discusses')
					.then((res) => {
						console.log(res)
						this.loading_v = false
						this.data = res.data.data
						this.comment_length = res.data.meta.total
						if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.next = res.data.links.next
						if(this.data.length > 0) {
							this.nomessageshow = false
						} else {
							this.nomessageshow = true
						}
					})
					.catch((error) => {

					})
			}
		},
		computed: {

		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>

<style scoped>
	.more_comment {
		background: #ffffff;
		border-bottom: 1px solid #e3e3e3;
		padding-bottom: .75rem;
	}
	
	.show_more {
		color: #b0b0b0;
		font-size: 13.0px;
		text-align: center;
		padding: .7rem 0 .4rem 0;
		position: relative;
		width: 55%;
		margin: 0 auto;
	}
	
	.show_more:after {
		content: '';
		height: 1px;
		width: 25%;
		position: absolute;
		background: #e0e0e0;
		left: -20%;
		top: .86rem;
	}
	
	.show_more:before {
		content: '';
		height: 1px;
		width: 25%;
		position: absolute;
		background: #e0e0e0;
		right: -20%;
		top: .86rem;
	}
	
	.show_more_two {
		color: #888888;
		font-size: 13.0px;
		text-align: center;
		padding-bottom: .35rem;
	}
	
	.share_comment {
		color: #1B9DE2;
		border: 1px solid #1B9DE2;
		width: 113px;
		text-align: center;
		margin: 0 auto;
		padding: .2rem 0;
		border-radius: 4px;
	}
	
	.class_point {
		padding: .3rem 0;
		background: #ffffff;
		margin-bottom: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		padding-right: .2rem;
		margin-top: .2rem;
	}
	
	.class_icon {
		margin: 0 .1rem;
		vertical-align: middle;
	}
	
	.class_point_title span {
		font-size: 12.0px;
		vertical-align: middle;
		color: #b0b0b0;
		padding-left: .3rem;
	}
	
	.left {
		float: left;
		width: 12%;
		text-align: center;
	}
	
	.right {
		float: right;
		width: 88%;
	}
	
	.clear {
		clear: both;
	}
	
	.class_comment {
		margin-top: .2rem;
		padding: .2rem 0 0 .3rem;
	}
	
	.class_comment_img {
		width: 24px;
		border-radius: 50%;
		vertical-align: middle;
	}
	
	.class_comment_wxname {
		color: #999999;
		font-size: 15.0px;
		margin-left: .15rem;
		vertical-align: middle;
	}
	
	.class_comment_content {
		margin-top: .2rem;
		color: #666666;
		font-size: 13.0px;
		padding-bottom: .4rem;
		border-bottom: 1px solid #e3e3e3;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.share_comment {
		width: 80%;
		margin: 0 auto;
		text-align: center;
		border: 1px solid #3AAEFF;
		padding: .15rem 0;
		color: #3AAEFF;
		margin-top: .3rem;
		border-radius: 2px;
	}
</style>