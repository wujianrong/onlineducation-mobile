<template>
	<div v-title data-title="课程">
		<div v-show="!loading_v">
			<topnav :index="index" @ievent="ievent" :top_nav="top_nav" :genre_nav="genre_nav"></topnav>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<yd-list theme="1" slot="list">
					<!--这里可选1/2/3/4/5五种样式-->
					<yd-list-item v-for="item, key in data" :key="key" @click.native="comeclass(item.id)">
						<img slot="img" :src="item.pictrue">
						<span slot="title">{{item.name}}</span>
						<yd-list-other slot="other">
							<div class="sub_name">
								<span class="demo-list-price">{{item.title}}</span>
							</div>
						</yd-list-other>
					</yd-list-item>
				</yd-list>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">没有更多内容</span>
				<!-- 加载中提示，不指定，将显示默认加载中图标 -->
				<div slot="loadingTip">
					<loading></loading>
				</div>
			</yd-infinitescroll>
		</div>
		<nodata v-if="nomessageshow"></nodata>
		<v-loading v-show="loading_v"></v-loading>
		<div v-show="loading_way" class="show_class">
			<loading></loading>
		</div>
	</div>
</template>
<script>
	import topnav from '../class/common/top_nav.vue'
	import loading from '../common/loading'
	import vloading from '../loading/loading'
	import nodata from '../common/NoData'
	export default {
		created() {

		},
		data() {
			return {
				data: [],
				index: true,
				childWords: '',
				top_nav: [],
				genre_nav: [],
				loading_v: false,
				loading_way: false,
				allclass: {
					active: true,
					created_at: "2017-12-07 14:31:07",
					id: 'all',
					lessons: [],
					name: "全部课程"
				},
				nomessageshow: false,
				next: ''
			}
		},
		components: {
			topnav,
			loading,
			'v-loading': vloading,
			nodata
		},
		methods: {
			loadList() {
				axios.get(this.next)
					.then((res) => {
						console.log(res)
						const _list = res.data.data;
						// this.data原本的数据，..._list更新后的数据（往里面添加）
						this.data = [...this.data, ..._list];
						if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.next = res.data.links.next
					})
					.catch((error) => {
						console.log(error);
					});
			},
			ievent(data) {
				this.childWords = data
			},
			//分类
			getGenrelist() {
				return axios.get('/item/genre/lists')
			},
			//栏目
			getNavlist() {
				return axios.get('/item/nav/lists')
			},
			//栏目课程列表
			getNav_lessons() {
				return axios.get('/item/lesson/'+this.$route.params.id+'/nav_lessons')
			},
			getAll() {
				this.loading_v = true
				axios.all([this.getGenrelist(), this.getNavlist(), this.getNav_lessons()])
					.then(axios.spread((genredata, navdata, nav_lessons) => {
						// 多个请求现在都执行完成
						// 编辑页面的时候赋值
						this.loading_v = false
						this.$dialog.loading.close()
						genredata.data.unshift(this.allclass)
						this.genre_nav = genredata.data
						this.top_nav = navdata.data
						console.log(nav_lessons)
						this.data = nav_lessons.data.data
						this.next = nav_lessons.data.links.next
						if(this.data.length > 0) {
							this.nomessageshow = false
						} else {
							this.nomessageshow = true
						}
						this.$nextTick(function() {
							window.scrollTo(0, 1)
							window.scrollTo(0, 0)
						})
						if(nav_lessons.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
					}))
			},
			getRoutelist(){
				this.data = []
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
				this.loading_way = true
				axios.get('/item/lesson/'+this.$route.params.id+'/nav_lessons')
				    .then((res) => {
				    	this.data = res.data.data
				    	this.loading_way = false
				    	if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
				    	this.next = res.data.links.next
				    })
			},
			getGenre(id){
				this.data = []
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
				this.loading_way = true
				axios.get('/item/lesson/'+this.$route.params.id+'/nav/'+id+'/genre_lessons')
				    .then((res) => {
				    	this.data = res.data.data
				    	this.loading_way = false
				    	if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
				    	this.next = res.data.links.next
				    })
			},
			comeclass(id) {
				this.$router.push({
					name: 'details',
					params: {
						id
					}
				})
			}
		},
		computed: {

		},
		mounted() {
			this.ievent()
			this.getAll()
		},
		watch: {
			$route() {
				this.getRoutelist()
			},
			childWords(val) {
				if(val == 'all'){
					this.getRoutelist()
				}else if(val == undefined){
					console.log(val)
				}else{
					this.getGenre(val)
				}
			}
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
		background-color: #FDB553;
		top: 4px;
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
	.show_class{
		height: 1rem;
		text-align: center;
	}
	.show_class svg{
		height: 1rem;
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