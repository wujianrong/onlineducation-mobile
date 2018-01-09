<template>
	<div>
		<yd-flexbox class="top">
			<div class="yd-flexbox-item" @click="gosearch">
				<yd-flexbox-item class="search">
					<yd-icon name="icon-ic_search" custom size=".3rem" color="#919191" class="icon_search"></yd-icon>
					<span class="gray_search">搜索课程</span>
				</yd-flexbox-item>
			</div>

			<div class="ic_mail_outline" @click="gosysmessage">
				<yd-icon name="icon-ic_mail_outline" custom size=".6rem" color="#FFFFFF" class="mail_icon"></yd-icon>
				<span class="yd-tabbar-badge" v-if="badge > 0">
            		<span class="yd-badge yd-badge-danger">{{badgeted}}</span>
				</span>
			</div>
		</yd-flexbox>
		<slider :advert="advertdata"></slider>
		<yd-flexbox class="col_padding_bottom">
			<yd-flexbox-item v-for="item,key in navdata" :key="key" class="col_item_flex">
				<router-link :to="{ name: 'class', params: { id: parseInt(item.id) }}" class="router-link-exact-active router-link-active">
					<div class="yd-grids-icon col_height"><img :src="item.pictrue" /></div>
					<div class="yd-grids-txt"><span>{{item.name}}</span></div>
				</router-link>
			</yd-flexbox-item>
		</yd-flexbox>
	</div>
</template>
<script>
	import slider from './slider.vue'
	export default {
		components: {
			slider
		},
		props: ['advertdata','navdata'],
		created() {

		},
		data() {
			return {
				badge: null
			}
		},
		methods: {
			gosearch() {
				this.$router.push({
					name: 'search'
				})
			},
			gosysmessage() {
				this.$router.push({
					name: 'sysmessage'
				})
			}
		},

		computed: {
			badgeted(){
				if(this.badge > 99){
					return '99+'
				}else{
					return this.badge
				}
			}
		},
		mounted() {
			if(this.$storage.get('userM')){
				this.data = this.$storage.get('userM');
				this.badge = this.$storage.get('messages_count');
			}else{
				axios.get('/item/guest/profile')
				.then((res) => {
					console.log(res);
					this.data = res.data.guest;
					this.badge = res.data.messages_count;
				}).catch((error) => {
					console.log(error)
				})
			}
		},
		watch: {

		}
	}
</script>
<style scoped>
	.top {
		padding: 6px 10px;
		position: absolute;
		z-index: 2;
		width: 100%;
	}
	
	.search {
		padding: 3px 15px;
		border: 1px solid #e3e3e3;
		background: rgba(255, 255, 255, .8);
		border-radius: 30px;
	}
	
	.icon_search {
		vertical-align: middle;
	}
	
	.ic_mail_outline {
		padding-left: 6px;
		margin-right: 5px;
		position: relative;
	}
	
	.yd-tabbar-badge {
		left: 70%;
	}
	
	.gray_search {
		color: #b0b0b0;
	}
	
	.col_height {
		height: .98rem;
	}
	
	.col_height img {
		height: 90%;
	}
	
	.col_padding_bottom {
		padding-bottom: .2rem;
		background: #FFFFFF;
		padding-top: .15rem;
		flex-flow: row wrap;
	}
	
	.mail_icon {
		margin-top: .06rem;
		display: inline-block;
	}
	.col_item_flex{
		flex: none;
		width: 33.33%;
	}
</style>