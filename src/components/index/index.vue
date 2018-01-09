<template>
	<div v-title data-title="供应链微课堂">
		<div>
			<bottomnav :index="index"></bottomnav>
			<indextop :advertdata="advertdata" :navdata="navdata"></indextop>
			<div class="index_background_gray"></div>
			<update :updata="updata" :navdata="navdata"></update>
			<div class="index_background_gray"></div>
			<div v-for="item,key in navdata" :key="key" class="nav_key">
				<yd-navbar>
					<router-link to="#" slot="left">
						<span class="update_nav">{{item.name}}栏目</span>
					</router-link>
					<div @click="more(item.id)" slot="right">
						<span class="checkmore">查看更多></span>
					</div>
				</yd-navbar>
				<yd-list theme="1">
					<!--这里可选1/2/3/4/5五种样式-->
					<yd-list-item v-for="bitem, bkey in item.lessons" :key="bkey" @click.native="comeclass(bitem.id)">
						<img slot="img" :src="bitem.pictrue">
						<span slot="title">{{bitem.name}}</span>
						<yd-list-other slot="other">
							<div class="sub_name">
								<span class="demo-list-price">{{bitem.title}}</span>
							</div>
						</yd-list-other>
					</yd-list-item>
				</yd-list>
				<div class="index_background_gray"></div>
			</div>
			<div class="bottom_height"></div>
		</div>
	</div>
</template>

<script>
	import bottomnav from '../common/Bottom_nav.vue'
	import indextop from './index_top.vue'
	import update from './update.vue'
	import vloading from '../loading/loading'
	export default {
		name: 'app',
		created() {
			this.getAll()
		},
		data() {
			return {
				index: true,
				advertdata: this.$localStorage.get('advertData'),
				navdata: this.$localStorage.get('indexData').nav,
				updata: this.$localStorage.get('indexData').last_lessons,
				searchclass: this.$localStorage.get('indexData').lesson_names,
				loading_v: false
			}
		},
		components: {
			bottomnav,
			indextop,
			update,
			'v-loading': vloading,
		},
		methods: {
			//获取广告列表
			getAdvertlist() {
				return axios.get('/item/advert/lists')
			},
			//获取首页数据
			getIndexlist() {
				return axios.get('/item/lesson/index')
			},
			getAll() {
				this.loading_v = true
				axios.all([this.getIndexlist(), this.getAdvertlist()])
					.then(axios.spread((indexdata, advertdata) => {
						// 多个请求现在都执行完成
						// 编辑页面的时候赋值
						console.log(indexdata)
						let indexData_get = this.$localStorage.get('indexData')
						if(indexData_get == '1') {
							this.$localStorage.set('indexData', indexdata.data)
							this.$localStorage.set('advertData', advertdata.data)
							window.location.reload()
							return
						} else {
							this.$localStorage.set('indexData', indexdata.data)
							this.$localStorage.set('advertData', advertdata.data)
						}
						this.$localStorage.set('searchclassdata', this.searchclass)
						this.loading_v = false
						this.$dialog.loading.close()
					}))
			},
			comeclass(id) {
				this.$router.push({
					name: 'details',
					params: {
						id
					}
				})
			},
			more(id) {
				this.$router.push({
					name: 'class',
					params: {
						id
					}
				})
			}
		},
		mounted() {
			if(this.$localStorage.get('indexData') == '1') {
				this.$dialog.loading.open('很快加载好了')
			}
		}
	}
</script>
<style scoped>
	.index_background_gray {
		height: .2rem;
		background: whitesmoke;
	}
	
	.update_nav {
		font-size: 15.0px;
		padding-left: .3rem;
		position: relative;
	}
	
	.update_nav:after {
		content: '';
		position: absolute;
		width: 3px;
		height: 14px;
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
	
	.nav_key:nth-child(6) .update_nav:after {
		background-color: #ffb745;
	}
	
	.nav_key:nth-child(7) .update_nav:after {
		background-color: #fd6d50;
	}
	
	.nav_key:nth-child(8) .update_nav:after {
		background-color: #2ccf44;
	}
	
	.nav_key:nth-child(9) .update_nav:after {
		background-color: #2cd8de;
	}
	
	.nav_key:nth-child(10) .update_nav:after {
		background-color: #3897ff;
	}
	
	.nav_key:nth-child(11) .update_nav:after {
		background-color: #ffa357;
	}
	
	.nav_key:nth-child(12) .update_nav:after {
		background-color: #ef80ff;
	}
	
	.nav_key:nth-child(13) .update_nav:after {
		background-color: #72b35e;
	}
	
	.nav_key:nth-child(14) .update_nav:after {
		background-color: #a975ff;
	}
</style>