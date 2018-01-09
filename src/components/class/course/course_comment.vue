<template>
	<div>
		<div class="class_point">
			<div class="class_point_title">
				<div class="left">
					<yd-icon class="class_icon" name="icon-message-alert" custom size="0.4rem" color="#6ac468"></yd-icon>
				</div>
				<div class="right">
					<span>精选点评</span>
					<span class="comment_right">以下评论由后台精选后显示</span>
				</div>
				<div class="clear"></div>
			</div>
			<div class="class_comment" v-for="item,key in data" :key="key" v-show="!loading_v">
				<div class="class_comment_name">
					<img class="class_comment_img" :src="item.avatar" />
					<span class="class_comment_wxname">{{item.guest}}</span>
					<span class="class_comment_vip" v-if="item.is_vip == true"><yd-icon class="class_icon" name="icon-vimeo" custom size="0.3rem" color="#ff9800"></yd-icon></span>
				</div>
				<div class="class_comment_content">
					<p>{{item.content}}</p>
				</div>
			</div>
			<div class="class_comment">
				<div class="class_comment_name">
					<img class="class_comment_img" :src="user.picture" />
					<span class="class_comment_share">分享你的点评</span>
				</div>
				<div class="class_comment_content">
					<div class="share_comment" @click="share_comment">
						<yd-icon class="class_icon" name="icon-pencil" custom size="0.3rem" color="#289FE0"></yd-icon>
						<span>请在这里写下你的点评</span>
					</div>
				</div>
			</div>
			<div class="comment_more" @click="comment_more">
				<p>查看更多点评></p>
			</div>
		</div>
		<div class="vip_freedom" v-if="coudata.type == '付费课程'">
			<p class="buy_notes_p1">购买须知</p>
			<p class="buy_notes_p2" v-html="coudata.educational.content">{{coudata.educational.content}}</p>
		</div>
		<div class="class_height"></div>
	</div>
</template>

<script>
	export default {
		props: ['coudata'],
		created() {

		},
		data() {
			return {
				data: [],
				loading_v: false,
				user: []
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
			comment_more() {
				let id = this.$route.params.id
				this.$router.push({
					name: 'morecomment',
					params: {
						id
					}
				})
			},
			getData() {
				this.loading_v = true
				this.user = this.$storage.get('userM')
				console.log(this.user)
				axios.get('/item/discusse/' + this.$route.params.id + '/lesson_discusses')
					.then((res) => {
						console.log(res)
						this.loading_v = false
						this.data = res.data.data.slice(0, 6)
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
	.class_point {
		padding: .3rem 0;
		background: #ffffff;
		margin-bottom: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		padding-right: .2rem;
	}
	
	.class_icon {
		margin: 0 .1rem;
		vertical-align: middle;
	}
	
	.class_point_title span {
		font-size: 16.0px;
		font-weight: bold;
		vertical-align: middle;
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
	
	.comment_right {
		color: #b0b0b0;
		font-size: 13.0px !important;
		font-weight: normal !important;
		float: right;
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
	
	.class_comment_share {
		color: #101010;
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
	
	.comment_more {
		color: #3595FF;
		font-size: 15.0px;
		text-align: center;
		margin-top: .3rem;
	}
	
	.class_height {
		height: 1rem;
		margin-top: .2rem;
	}
	
	.vip_freedom {
		background: #ffffff;
		margin-top: .2rem;
		padding: .3rem .2rem .5rem .2rem;
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