<template>
	<div v-title data-title="写点评">
		<textarea v-model="text" maxlength="200" class="comment_text" placeholder="你可以写几句对本课程的评价或看法。点评将由管理员筛选后显示，对所有人可见。"></textarea>
		<div class="comment_submit" @click="comment_submit">
			<p>提交</p>
		</div>
	</div>
</template>

<script>
	export default {
		created() {

		},
		data() {
			return {
				text: ''
			}
		},
		methods: {
			comment_submit() {
				if(this.text == '') {
					this.$dialog.toast({
						mes: '请先填写评论',
						timeout: 500
					})
				} else {
					axios.post('/item/discusse/' + this.$route.params.id, {
							'content': this.text
						})
						.then((res) => {
							if(res.data.status == true) {
								this.$dialog.toast({
									mes: '评论成功',
									timeout: 500
								})
								window.history.go(-1)
							} else {
								console.log(res)
								let word = '检测到您输入的内容中，存在敏感词：' + res.data.word
								this.$dialog.toast({
									mes: word,
									timeout: 2000
								})
							}
						})
				}
			}
		},
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>

<style scoped>
	.comment_text {
		display: block;
		width: 100%;
		height: 180px;
		padding: 15px;
		border: none;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border-bottom: 1px solid #e3e3e3;
		color: #000000;
		font-size: 14.0px;
	}
	
	::-webkit-input-placeholder {
		color: #b0b0b0;
		font-size: 14.0px;
		font-weight: normal;
	}
	
	.comment_submit {
		margin: .4rem .3rem;
		text-align: center;
		color: #fff;
		background-color: #42b0ff;
		font-size: 14.0px;
		border-radius: 4px;
		border: 1px solid #008fe0;
		padding: .23rem 0;
	}
	
	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #999;
	}
	
	textarea:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #999;
	}
	
	textarea::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #999;
	}
	
	textarea:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #999;
	}
</style>