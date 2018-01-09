<template>
	<div v-title data-title="消息详情">
		<div class="messagedetails" v-show="!loading_v">
			<div class="messagedetails_p1">
				<p>{{data.title}}</p>
			</div>
			<div class="messagedetails_content">
				<p v-html="data.content"></p>
				<a :href="data.url">
					<img :src="data.picture" class="message_img" />
				</a>
			</div>
			<div class="messagedetails_time">
				<p>{{data.created_at}}</p>
			</div>
		</div>
		<!--<v-loading v-show="loading_v"></v-loading>-->
	</div>
</template>

<script>
	import vloading from '../loading/loading'
	export default {
		components: {
			'v-loading': vloading
		},
		data() {
			return {
				data: [],
				loading_v: false
			}
		},
		methods: {
			getData() {
				this.loading_v = true
				axios.get('/item/message/' + this.$route.params.id)
					.then((res) => {
						console.log(res)
						this.loading_v = false
						this.data = res.data.data
					})
					.catch((error) => {

					})
			},
			updateMessages_count() {
				axios.get('/item/guest/profile')
					.then((res) => {
						console.log(res);
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
		watch: {}
	}
</script>
<style scoped>
	.messagedetails {
		background: #ffffff;
		padding: 20px;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.messagedetails_p1 {
		font-size: 18px;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.messagedetails_content {
		font-size: 14px;
		margin-top: .4rem;
		color: #707070;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.messagedetails_time {
		margin-top: .3rem;
		text-align: right;
		color: #b0b0b0;
	}
	
	.message_img {
		width: 100%;
		margin-top: .3rem;
	}
</style>