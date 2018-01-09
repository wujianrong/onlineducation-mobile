<template>
	<div>
		<yd-slider autoplay="3000">
			<yd-slider-item class="slider_item" v-for="item,key in set_advert" :key="key">
				<a @click="comelink(item.url)">
					<img :src="item.path">
				</a>
			</yd-slider-item>
		</yd-slider>
	</div>
</template>
<script>
	export default {
		props: ['advert'],
		created() {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			comelink(url) {
				if(isNaN(url) == true) {
					window.location.href = url
				} else {
					let id = parseInt(url)
					this.$router.push({
						name: 'details',
						params: {
							id
						}
					})
				}
			}
		},
		computed: {
			set_advert(){
				return this.advert.sort((a,b)=>a.order-b.order);
			}
		},
		mounted() {
			
		},
		watch: {
			
		}
	}
</script>
<style>
	.yd-slider-pagination-item {
		border: 2px solid #ffffff;
		width: 7px;
		height: 7px;
		background: none;
	}
	
	.yd-slider-pagination-item-active {
		background: #FFFFFF;
	}
	
	.yd-slider-pagination {
		bottom: .25rem;
	}
</style>