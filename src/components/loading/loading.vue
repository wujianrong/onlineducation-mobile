<!-- 进入页面加载动画 -->
<template>
	<div></div>
</template>
<script>
	export default {
		methods: {
			openLoading() {
                this.$dialog.loading.open('很快加载好了')
            }
		},
		mounted() {
			this.openLoading()
		}
	}
</script>
<style scoped>
	.lds-ellipsis {
		width: 100px;
		margin: 0 auto;
		display: block;
		margin-top: 3rem;
	}
</style>