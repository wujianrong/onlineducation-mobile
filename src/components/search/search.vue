<template>
	<div v-title data-title="搜索">
		<yd-flexbox class="search_box">
			<div onclick="window.history.go(-1)">
				<yd-icon name="icon-keyboard-backspace" slot="icon" custom size="0.54rem" class="backspace_search"></yd-icon>
			</div>
			<yd-flexbox-item>
				<yd-search placeholder="搜索课程" :result="result" fullpage v-model="value2" :item-click="itemClickHandler" :on-submit="submitHandler" ref="yd_search">
				</yd-search>
			</yd-flexbox-item>
		</yd-flexbox>
		<yd-flexbox class="searchhistory" v-if="searchshow">
			<yd-flexbox-item>
				<span>搜索历史</span>
			</yd-flexbox-item>
			<yd-flexbox-item class="history_right">
				<span class="red" @click="deletehis">清除记录</span>
			</yd-flexbox-item>
		</yd-flexbox>
		<div class="search_hos_box" v-if="searchshow && history_i.length > 0">
			<div class="search_hos" v-for="item,key in history_i" :key="key">
				<yd-icon name="icon-ic_access_time" slot="icon" custom size="0.34rem" class="search_hos_icon"></yd-icon>
				<span class="history_left" @click="PostSearch(item)">{{item}}</span>
				<span class="icon_x_right" @click="delete_index(key)">
					<yd-icon name="icon-close" slot="icon" custom size="0.34rem"></yd-icon>
				</span>
				<div class="clear"></div>
			</div>
		</div>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
			<div class="search_result" v-for="item,key in data" :key="key" @click="comeclass(item.id)" slot="list">
				<a>
					<div class="search_img">
						<img :src="item.pictrue" />
					</div>
					<div class="search_title">
						<p class="search_title_p1">{{item.name}}</p>
						<p class="search_title_p2">{{item.title}}</p>
					</div>
					<div class="clear"></div>
				</a>
			</div>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip">没有更多内容</span>
			<!-- 加载中提示，不指定，将显示默认加载中图标 -->
			<div slot="loadingTip">
				<loading></loading>
			</div>
		</yd-infinitescroll>
		<div class="hollow_img" v-if="NoSearch">
			<img src="../../assets/hollow.png" />
			<p>没有找到你想要的课程，换个关键词试试！！</p>
		</div>
		<div v-show="loading_way" class="show_class">
			<loading></loading>
		</div>
	</div>
</template>

<script>
	import loading from '../common/loading'
	export default {
		components: {
			loading
		},
		data() {
			return {
				data: [],
				value2: '',
				result: [],
				history_i: [],
				searchshow: true,
				getres: [],
				next: '',
				isSearch: false,
				NoSearch: false,
				loading_way: false,
				page: 1,
				pageSize: 8
			}
		},
		methods: {
			getResult(val) {
				if(!val) return [];
				return this.getres.filter(value => new RegExp(val, 'i').test(value))
			},
			itemClickHandler(item) {
				this.isSearch = false
				this.history_i.forEach((cod) => {
					if(cod == item) {
						this.isSearch = true
					}
				})
				if(this.isSearch == false) {
					this.history_i.push(item)
					this.$localStorage.set('localhistory', this.history_i)
				}
				setTimeout(() => {
					this.setValue(item)
				}, 100)
				this.searchshow = false
				this.PostSearch(item)
			},
			submitHandler(item) {
				this.isSearch = false
				this.history_i.forEach((cod) => {
					if(cod == item) {
						this.isSearch = true
					}
				})
				if(this.isSearch == false) {
					this.history_i.push(item)
					this.$localStorage.set('localhistory', this.history_i)
				}
				setTimeout(() => {
					this.setValue(item)
				}, 100)
				this.searchshow = false
				this.PostSearch(item)
			},
			setValue(item) {
				this.$nextTick(function() {
					this.value2 = item
				})
			},
			deletehis() {
				this.$dialog.confirm({
					title: '清空',
					mes: '确定清空搜索记录吗？',
					opts: [{
						txt: '取消',
						color: false,
						callback: () => {

						}
					}, {
						txt: '清空',
						color: true,
						callback: () => {
							this.history_i = []
							this.$localStorage.set('localhistory', this.history_i)
							this.$dialog.toast({
								mes: '清空成功',
								timeout: 1000
							})
						}
					}]
				});
			},
			delete_index(key) {
				this.history_i.splice(key, 1)
				this.$localStorage.set('localhistory', this.history_i)
			},
			get_history() {
				let gethis = this.$localStorage.get('localhistory')
				if(gethis != null) {
					this.history_i = this.$localStorage.get('localhistory')
				}
			},
			getres_search() {
				let gethis = this.$localStorage.get('searchclassdata')
				if(gethis != null) {
					this.getres = this.$localStorage.get('searchclassdata')
				}
			},
			PostSearch(item) {
				this.searchshow = false
				this.data = [];
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
				this.loading_way = true
				this.NoSearch = false
				this.page = 1
				setTimeout(() => {
					this.setValue(item)
				}, 100)
				axios.get('/item/lesson/search?word=' + item)
					.then((res) => {
						console.log(res)
						this.data = res.data.data
						this.loading_way = false
						if(this.data.length == 0) {
							this.NoSearch = true
						} else {
							this.NoSearch = false
						}
						if(res.data.data.length == 0) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
						this.page++
					})
			},
			loadList() {
				axios.get('/item/lesson/search?word=' + this.value2 + '&page=' + this.page + '&pagesize=' + this.pageSize)
					.then((res) => {
						console.log(res)
						const _list = res.data.data
						this.data = [...this.data, ..._list]
						if(res.data.data.length == 0) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
						this.page++
					})
					.catch((error) => {
						console.log(error);
					});
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
		mounted() {
			this.get_history()
			this.getres_search()
		},
		watch: {
			value2(val) {
				this.$nextTick(function() {
					this.result = this.getResult(val)
				})

			}
		}
	}
</script>
<style scoped>
	.search_box {
		border-bottom: 1px solid #d1d1d1;
		background: #ffffff;
	}
	
	.hollow_img {
		text-align: center;
		margin-top: 1.5rem;
	}
	
	.hollow_img img {
		width: 80%;
	}
	
	.hollow_img p {
		margin-top: .7rem;
	}
	
	.search_img img {
		width: 114px;
	}
	
	.search_img {
		float: left;
	}
	
	.search_title {
		width: 60%;
		float: left;
		margin-left: .2rem;
	}
	
	.search_title_p1 {
		font-size: 16px;
		margin-top: .1rem;
	}
	
	.search_title_p2 {
		color: #b3b2b2;
		margin-top: .4rem;
	}
	
	.search_title_p1,
	.search_title_p2 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.search_result {
		padding: 15px;
		background: #ffffff;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.search_result:nth-child(1) {
		margin-top: .3rem;
		border-top: 1px solid #CCCCCC;
	}
	
	.backspace_search {
		margin-left: .2rem;
		color: #444444;
	}
	
	.search_right {
		color: #17b9ff;
		font-size: 15.0px;
		margin-right: .2rem;
	}
	
	.searchhistory {
		padding: 10px;
		border-bottom: 1px solid #d1d1d1;
	}
	
	.history_right {
		text-align: right;
	}
	
	.search_size {
		font-size: 16px;
		font-weight: bold;
		letter-spacing: 2px;
	}
	
	.search_hos {
		margin-left: 20px;
		border-bottom: 1px solid #ccc;
		padding: 15px 0;
	}
	
	.search_hos:last-child {
		border-bottom: none
	}
	
	.search_hos_box {
		background: #FFFFFF;
		border-bottom: 1px solid #d1d1d1;
	}
	
	.search_hos_icon {
		vertical-align: middle;
		margin-right: .4rem;
		float: left;
	}
	
	.icon_x_right {
		float: right;
		margin-right: 15px;
	}
	
	.history_left {
		float: left;
		width: 75%;
		padding-top: 1px;
		overflow: hidden;
		white-space: nowrap;
		padding-right: 12px;
		text-overflow: ellipsis;
	}
	
	.clear {
		clear: both;
	}
	
	.show_class {
		height: 1rem;
		text-align: center;
	}
	
	.show_class svg {
		height: 1rem;
	}
</style>
<style>
	.yd-search-input {
		background-color: #ffffff;
	}
	
	.yd-search-input:after {
		border-bottom: none;
	}
	
	.yd-search-input>.search-input {
		border: 1px solid #e3e3e3;
		border-radius: 30px;
	}
	
	.yd-input>input {
		outline: none;
		-webkit-appearance: none;
	}
</style>