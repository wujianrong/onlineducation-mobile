<template>
	<div v-title data-title="个人资料">
		<div class="user_myvip_more">
			<div class="user_ko">
				<div class="left">
					<p class="line_height64">
						头像
					</p>
				</div>
				<div class="right">
					<div class="time">
						<img :src="data.picture" />
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						姓名
					</p>
				</div>
				<div class="right">
					<div class="time">
						{{ data.nickname }}
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						性别
					</p>
				</div>
				<div class="right">
					<div class="time">
						{{ data.gender }}
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						地区
					</p>
				</div>
				<div class="right">
					<div class="time">
						{{ data.position }}
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						手机
					</p>
				</div>
				<div class="right">
					<div v-if="data.phone" class="time">
						{{ data.phone }}
					</div>
					<div v-else="data.phone">
						<router-link to="bindmobile">
							<div class="time red">
								未绑定
							</div>
						</router-link>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data : {}
			}
		},
		methods: {
	 
		},
		mounted() {
			// this.data = JSON.parse(window.localStorage.getItem('userMessage'));
			this.data = this.$storage.get('userM')

		}
	}
</script>
<style scoped>
	.clear {
		clear: both;
	}
	
	.uservip {
		vertical-align: middle;
	}
	
	.user_myvip {
		padding: .2rem .4rem;
		background: #ffffff;
		margin-top: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.left {
		float: left;
	}
	
	.left p,
	.time {
		font-size: 16.0px;
		line-height: 36px;
	}
	
	.line_height64 {
		line-height: 64px !important;
	}
	
	.uservip_myicon {
		vertical-align: middle;
		margin-right: .2rem;
	}
	
	.right {
		float: right;
	}
	
	.time span {
		color: #e2c07d;
	}
	
	.time img {
		width: 60px;
		border-radius: 30px;
	}
	
	.user_myvip_more {
		background: #ffffff;
		margin-top: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko {
		margin-left: .4rem;
		padding: .2rem .4rem .2rem 0;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko:last-child {
		border-bottom: none;
	}
</style>