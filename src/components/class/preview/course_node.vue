<template>
	<div>
		<div class="class_top_class">
			<img :src="data_class.pictrue" style="width: 100%;" />
			<div class="class_top_content">
				<div class="class_top_content_left">
					<p class="class_top_content_left_p">{{data_class.name}}</p>
					<div class="class_top_content_center_left">
						<div class="class_joint left">
							<yd-icon name="icon-map" custom size="0.34rem"></yd-icon>
							<span>{{time_length}}节课</span>
						</div>
						<div class="class_time left">
							<yd-icon name="icon-ic_access_time" custom size="0.34rem"></yd-icon>
							<span>{{timeall}}</span>
						</div>
						<div class="class_show left">
							<yd-icon name="icon-play-circle-outline" custom size="0.34rem"></yd-icon>
							<span>{{watchNumber}}次</span>
						</div>
						<div class="clear"></div>
					</div>
				</div>
				<div class="class_top_content_right">
					<yd-icon ref="collect" :name="countar" custom size="0.54rem" color="#ffd338"></yd-icon>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="class_teacher">
			<span class="class_teacher_name">{{data_class.teacher.name}}</span>
			<span class="class_teacher_rank">{{data_class.teacher.office}}</span>
			<ellipsis ref="moreDemo" :text="data_class.teacher.describle" :line="3" :show-button="true"></ellipsis>
		</div>
		<!--
        	作者：429762423@qq.com
        	时间：2017-12-11
        	描述：免费课程
        -->
		<div class="class_content" v-if="data_class.type == '免费课程'">
			<div class="class_content_top_gl">
				<div class="class_content_left left">
					<yd-icon name="icon-book-open-variant" custom size="0.44rem" color="#3595FF"></yd-icon>
				</div>
				<div class="class_content_right right">
					<p>课程内容</p>
				</div>
				<div class="clear"></div>
			</div>
			<div class="class_content_top_gl" v-for="item,key in data_class.sections" v-if="key < datalength" :key="key">
				<div class="class_content_left class_col_span left">
					<span>{{key + 1}}</span>
				</div>
				<div class="class_content_right right">
					<div class="left width80">
						<p class="class_content_p" v-if="item.is_learned == 0">{{item.name}}</p>
						<p class="class_content_p gray" v-if="item.is_learned == 1">{{item.name}}</p>
						<span class="class_content_time">{{item.video.url[item.video.url.length-1].duration}}</span>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="class_content_top_gl" @click="showclass" v-if="datalength < data_class.sections.length">
				<div class="class_content_left left">
					<yd-icon name="icon-chevron-down" custom size="0.44rem" color="#ababab"></yd-icon>
				</div>
				<div class="class_content_right right">
					<p class="gray">展开全部{{data_class.sections.length}}节课</p>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<!--
        	作者：429762423@qq.com
        	时间：2017-12-11
        	描述：VIP课程  || 付费课程
        -->
		<div class="class_content" v-if="data_class.type == 'VIP课程' || data_class.type == '付费课程'">
			<div class="class_content_top_gl">
				<div class="class_content_left left">
					<yd-icon name="icon-book-open-variant" custom size="0.44rem" color="#3595FF"></yd-icon>
				</div>
				<div class="class_content_right right">
					<p>课程内容</p>
				</div>
				<div class="clear"></div>
			</div>
			<div class="class_content_top_gl" v-for="item,key in data_class.sections" v-if="key < datalength" :key="key">
				<div class="class_content_left class_col_span left">
					<span>{{key + 1}}</span>
				</div>
				<div class="class_content_right right">
					<div class="left width80">
						<p class="class_content_p" v-if="item.is_learned == 0">{{item.name}}</p>
						<p class="class_content_p gray" v-if="item.is_learned == 1">{{item.name}}</p>
						<span class="class_content_time">{{item.video.url[item.video.url.length-1].duration}}</span>
					</div>
					<div class="right width20" v-if="item.is_free == 1 && data_class.is_show == 0">
						<p class="freewatch">免费试看</p>
					</div>
					<div class="right width20" v-if="item.is_free == 0 && data_class.is_show == 0">
						<yd-icon name="icon-lock" custom size="0.34rem" color="#bababa" class="clss_lock"></yd-icon>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="class_content_top_gl" @click="showclass" v-if="datalength < data_class.sections.length">
				<div class="class_content_left left">
					<yd-icon name="icon-chevron-down" custom size="0.44rem" color="#ababab"></yd-icon>
				</div>
				<div class="class_content_right right">
					<p class="gray">展开全部{{data_class.sections.length}}节课</p>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<!--
        	作者：429762423@qq.com
        	时间：2017-12-18
        	描述：vip提示
        -->
		<yd-popup v-model="show_vip" position="center" width="80%">
			<yd-icon name="icon-close" custom size="0.34rem" @click.native="show_vip = false" color="#999999" class="show_icon_close"></yd-icon>
			<img src="../../../assets/show.png" class="show_img" />
			<p class="show_p_false">试看结束，开通VIP会员可观看全部课程视频</p>
			<p class="show_p_true" @click="come_vip">开通会员</p>
		</yd-popup>
		<!--
        	作者：429762423@qq.com
        	时间：2017-12-18
        	描述：收费提示
        -->
		<yd-popup v-model="show_course" position="center" width="80%">
			<yd-icon name="icon-close" custom size="0.34rem" @click.native="show_course = false" color="#999999" class="show_icon_close"></yd-icon>
			<img src="../../../assets/show.png" class="show_img" />
			<p class="show_p_false">试看结束，购买课程可观看本课程的所有章节</p>
			<p class="show_p_true" @click="buy_course">购买课程</p>
		</yd-popup>
	</div>
</template>

<script>
	import ellipsis from './ellipsis-plus.vue'
	export default {
		props: ['data_class', 'time_length', 'timeall', 'watchNumber', 'collect_is'],
		components: {
			ellipsis
		},
		created() {

		},
		data() {
			return {
				datalength: 8,
				countar: this.collect_is,
				show_vip: false,
				show_course: false
			}
		},
		methods: {
			collect() {
				if(this.countar == "icon-star-outline") {
					axios.get('/item/lesson/' + this.$route.params.id + '/collect')
						.then((res) => {
							let message = res.data.message
							this.countar = "icon-star"
							this.$dialog.toast({
								mes: message,
								timeout: 500
							})
						})
				} else {
					axios.get('/item/lesson/' + this.$route.params.id + '/collect')
						.then((res) => {
							let message = res.data.message
							this.countar = "icon-star-outline"
							this.$dialog.toast({
								mes: message,
								timeout: 500
							})
						})
				}
			},
			showclass() {
				this.datalength = this.data_class.sections.length
			},
			show_class(item) {
				let id = item.id
				if(this.data_class.type == '免费课程') {
					this.$router.push({
						name: 'showclass',
						params: {
							id
						}
					})
				}
				if(this.data_class.type == 'VIP课程' || this.data_class.type == '付费课程') {
					if(this.data_class.is_show == 1) {
						this.$router.push({
							name: 'showclass',
							params: {
								id
							}
						})
					} else if(item.is_free == 1) {
						this.$router.push({
							name: 'showclass',
							params: {
								id
							}
						})
					} else {
						if(this.data_class.type == 'VIP课程') {
							this.show_vip = true
						}
						if(this.data_class.type == '付费课程') {
							this.show_course = true
						}
					}
				}
			},
			come_vip() {
				this.$router.push({
					name: 'vippay'
				})
			},
			buy_course() {
				this.$emit('buycourse')
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
<style>
	.show_icon_close {
		float: right;
		margin-right: 5px;
		margin-top: 5px;
	}
</style>
<style scoped>
	.clear {
		clear: both;
	}
	
	.class_top_class {
		position: relative;
		display: grid;
	}
	
	.class_top_content {
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: rgba(16, 16, 16, .2);
		padding: 0 .3rem;
		padding-bottom: .3rem;
	}
	
	.class_top_content_left {
		float: left;
		width: 80%;
	}
	
	.class_top_content_left_p {
		font-size: 18.0px;
		color: #ffffff;
		font-weight: bold;
		margin-top: .3rem;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.class_top_content_center_left {
		color: rgba(255, 255, 255, .8);
		margin-top: .2rem;
	}
	
	.left {
		float: left;
	}
	
	.left i {
		vertical-align: middle;
	}
	
	.class_time,
	.class_show {
		margin-left: .2rem;
	}
	
	.class_top_content_right {
		float: right;
		margin-top: .55rem;
	}
	
	.class_teacher {
		background: #fff;
		padding: .3rem;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.class_teacher_name {
		font-size: 18.0px;
		vertical-align: sub;
	}
	
	.class_teacher_rank {
		background-color: #3C98FF;
		color: #fff;
		padding: .05rem .1rem;
		border-radius: 3px;
		margin-left: .2rem;
	}
	
	.class_teacher_p {
		color: #666666;
		margin-top: .15rem;
		line-height: .45rem;
		font-size: 13.0px;
		position: relative;
	}
	
	.class_content {
		margin-top: .2rem;
		margin-bottom: .2rem;
		background: #ffffff;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.class_content_left {
		width: 12%;
		text-align: center;
		padding: .3rem 0;
	}
	
	.right {
		float: right;
	}
	
	.class_content_right {
		width: 88%;
		font-size: 16.0px;
		padding: .3rem 0;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.class_content_top_gl:last-child .class_content_right {
		border-bottom: none;
	}
	
	.class_col_span {
		color: #9c9c9c;
		font-size: 14.0px;
		line-height: .85rem;
	}
	
	.class_content_time {
		color: #b0b0b0;
		font-size: 12.0px;
		margin-top: .1rem;
		display: inline-block;
	}
	
	.class_content_adv {
		color: #63c44b;
		font-size: 12.0px;
		margin-left: .3rem;
	}
	
	.class_content_p {
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.width80 {
		width: 80%;
	}
	
	.clss_lock {
		margin-top: .2rem;
		display: inline-block;
	}
	
	.width20 {
		width: 20%;
		text-align: center;
	}
	
	.freewatch {
		color: #ff7043;
		font-size: 10.0px;
		border-radius: 2px;
		border: 1px solid #ff7043;
		text-align: center;
		width: 90%;
		margin-top: .2rem;
	}
	
	.show_img {
		width: 100%;
	}
	
	.show_p_false {
		font-size: 16px;
		width: 70%;
		margin: 0 auto;
		text-align: center;
	}
	
	.show_p_true {
		margin-top: 15px;
		text-align: center;
		background-color: rgb(255, 121, 92);
		color: #ffffff;
		padding: 15px 0;
		font-size: 14px;
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
	}
</style>