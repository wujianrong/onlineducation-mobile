<template>
	<div>
		<div class="bgsuccess">
			<p class="successicon"><i class="iconfont icon-check-circle"></i></p>
			购买成功
		</div>
		<p class="successTitle">感谢你的购买，祝您有所收获</p>
		<div class="btn-box">
			<yd-button size="large" bgcolor="#42B0FF" color="#ffffff" type="primary" @click.native="$router.push({name: 'user'})">返回</yd-button>
		</div>
	</div>			
		
		
		
</template>
<script>
	export default {
		data() {
			return {
				 
			}
		},
		computed: {
			 
		},
		methods: {
		 
		},
		mounted() {
        	 
		}
	}
</script>
<style>
	.bgsuccess {
	 	width: 100%;
	 	height: 35%;
	 	/*background: #ffffff;*/
	 	text-align: center;
	 	color: #101010;
	 	font-size: 20px;
	 }
	 .successTitle {
	 	text-align: center;
	 	color: #888888;
	 	font-size: 16px;
	 }
	 .successicon {
	 	padding-top: 40px;

	 }
	 .successicon i {
	 	font-size: 120px;
	 	color: #09BB07;
	 }
	 .btn-box {
	 	margin-top: 50px;
	 	padding: 0 40px;
	 }
</style>