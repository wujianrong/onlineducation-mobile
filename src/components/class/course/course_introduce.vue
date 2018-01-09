<template>
	<div>
		<div class="class_point">
			<div class="class_point_title">
				<div class="left">
					<yd-icon class="class_icon" name="icon-information" custom size="0.4rem" color="#ff9417"></yd-icon>
				</div>
				<div class="right">
					<span>课程介绍</span>
				</div>
				<div class="clear"></div>
			</div>
			<div class="crowd" v-html="data_class.describle">
				{{data_class.describle}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data_class'],
		created() {

		},
		data() {
			return {

			}
		},
		methods: {

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
	
	.crowd {
		padding-left: .3rem;
		margin-top: .15rem;
		overflow: hidden;
	}
</style>