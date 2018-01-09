<template>
	<div>
		<yd-navbar>
			<router-link to="#" slot="left">
				<span class="update">VIP专属频道</span>
			</router-link>
			<div @click="more" slot="right">
				<span class="checkmore">查看更多></span>
			</div>
		</yd-navbar>
		<yd-list theme="1">
			<!--这里可选1/2/3/4/5五种样式-->
			<yd-list-item v-for="item, key in vipdata" :key="key" @click.native="comeclass(item.id)">
				<img slot="img" :src="item.pictrue">
				<span slot="title">{{item.name}}</span>
				<yd-list-other slot="other">
					<div class="sub_name">
						<span class="demo-list-price">{{item.title}}</span>
					</div>
				</yd-list-other>
			</yd-list-item>
		</yd-list>
	</div>
</template>
<script>
	export default {
		props: ['vipdata', 'navdata'],
		created() {

		},
		data() {
			return {
				
			}
		},
		methods: {
			comeclass(id) {
				this.$router.push({
					name: 'details',
					params: {
						id
					}
				})
			},
			more() {
				this.navdata.forEach(k => {
					if(k.name == 'VIP课程') {
						let id = k.id
						this.$router.push({
							name: 'class',
							params: {
								id
							}
						})
					}
				})
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
	.update {
		font-size: 15.0px;
		padding-left: .3rem;
		position: relative;
	}
	
	.update:after {
		content: '';
		position: absolute;
		width: 3px;
		height: 14px;
		background-color: #ff6442;
		top: .06rem;
		left: 6px;
	}
	
	.checkmore {
		color: #999999;
		font-size: 12px;
	}
	
	.sub_name {
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
</style>
<style>
	.yd-list-img {
		height: auto;
		padding: inherit;
		overflow: auto;
	}
	
	.yd-list-img img {
		margin-top: auto;
	}
	
	.yd-list-title {
		font-size: 16.0px;
		font-weight: normal;
	}
	
	.yd-list-theme1 .yd-list-item .yd-list-title {
		height: .49rem;
	}
</style>