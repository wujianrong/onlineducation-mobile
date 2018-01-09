<template>
	<div v-title data-title="视频播放">
		<div id="id_test_video" style="width:100%; height:auto;" ref="player"></div>
		<div class="loadplay" v-if="show_div">
			<yd-icon name="icon-close" slot="icon" custom size="0.25rem" color="#ffffff" @click.native="close_play"></yd-icon>
			<span class="white_play">上次看到{{time_str}}</span>
			<span class="play_ok" @click="play_fixed">继续播放</span>
		</div>
	</div>
</template>

<script>
	let TcPlayer = require('../../assets/TcPlayer-module-2.2.0.js')
	export default {
		created() {

		},
		data() {
			return {
				play_video: [], //保存播放器实例化函数
				show_div: false, //显示隐藏继续播放按钮
				time_str: '', //显示时长
				currentTime: '', //正在播放秒数
				duration: '', //视频总秒数
				percentage: '', //播放视频百分比
				data: [], //视频信息
				width: window.innerWidth,
				height: window.innerHeight
			}
		},
		methods: {
			show_video() {
				let that = this
				let player = new TcPlayer.TcPlayer.TcPlayer('id_test_video', {
					"mp4": that.data.video.url, //请替换成实际可用的播放地址
					"width": that.width, //视频的显示宽度，请尽量使用视频分辨率宽度
					"height": that.height, //视频的显示高度，请尽量使用视频分辨率高度
					"volume": '0.5',
					"listener": function(msg) {
						if(msg.type == 'loadeddata') {
							that.$localStorage.get('currentTime').forEach((item) => {
								if(item.id == that.data.id) {
									that.play_video.currentTime(item.time)
								}
							})
						}
						if(msg.type == 'timeupdate') { //获取当前播放时间
							that.currentTime = Math.floor(msg.src.el.currentTime)
							let curTime = {
								id: that.data.id,
								time: that.currentTime
							}
							let current = that.$localStorage.get('currentTime')
							let itemTrue = 0
							if(current) {
								current.forEach((item) => {
									if(item.id == that.data.id) {
										item.time = that.currentTime
										if(that.percentage == '100%') {
											item.time = 0
										}
										itemTrue = 1
									}
								})
								if(itemTrue == 0) {
									current.push(curTime)
								}
							} else {
								current.push(curTime)
							}
							that.$localStorage.set('currentTime', current)
						}
						if(msg.type == 'resize') { //获取视频总时长
							that.duration = Math.floor(msg.src.el.duration)
						}
						if(msg.type == 'playing') { //正在播放隐藏继续播放按钮
							that.show_div = false
						}
					}
				})
				this.play_video = player

			},
			play_fixed() {
				this.play_video.play()
				this.show_div = false
			},
			close_play() {
				this.show_div = false
			},
			formatSeconds(value) {
				let theTime = parseInt(value); // 秒
				let theTime1 = 0; // 分
				let theTime2 = 0; // 小时
				// alert(theTime);
				if(theTime > 60) {
					theTime1 = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					// alert(theTime1+"-"+theTime);
					if(theTime1 > 60) {
						theTime2 = parseInt(theTime1 / 60);
						theTime1 = parseInt(theTime1 % 60);
					}
				}
				let result = "" + parseInt(theTime) + "秒";
				if(theTime1 > 0) {
					result = "" + parseInt(theTime1) + "分" + result;
				}
				if(theTime2 > 0) {
					result = "" + parseInt(theTime2) + "小时" + result;
				}
				return result
			},
			Percentage(number1, number2) {
				return(Math.round(number1 / number2 * 10000) / 100.00 + "%") //小数点后两位百分比
			},
			getData() {
				axios.get('/item/lesson/section/' + this.$route.params.id)
					.then((res) => {
						if(res.data.status == false) {
							this.$dialog.alert({
								mes: res.data.message
							})
						} else {
							this.data = res.data.sections
							console.log(this.data)
							this.show_video()
						}
					})
			},
			//			play_times() {
			//				axios.get('/item/lesson/section/' + this.$route.params.id + '/set_play_times')
			//					.then((res) => {
			//						//console.log(this.data)
			//					})
			//			}
		},
		computed: {

		},
		mounted() {
			this.$localStorage.get('currentTime').forEach((item) => {
				if(item.id == this.$route.params.id) {
					if(item.time > 0) {
						this.show_div = true
						this.time_str = this.formatSeconds(item.time)
					}
				}
			})
			this.getData()
			//			this.play_times()
			const that = this
			window.onresize = function temp() {
				setTimeout((res) => {
					that.width = window.innerWidth.toString()
					that.height = window.innerHeight.toString()
					that.$refs.player.children[0].style.width = that.width + 'px'
					that.$refs.player.children[0].style.height = that.height + 'px'
					that.$refs.player.children[0].children[2].style.width = that.width + 'px'
					that.$refs.player.children[0].children[2].style.height = that.height + 'px'
				}, 100)
			}
		},
		watch: {
			currentTime(val) {
				this.percentage = this.Percentage(val, this.duration)
				//console.log(this.percentage)
			}
		}
	}
</script>

<style scoped>
	.loadplay {
		position: fixed;
		bottom: 20%;
		background-color: rgba(0, 0, 0, .6);
		font-size: 14.0px;
		padding: .25rem;
	}
	
	.play_ok {
		color: #42b0ff;
	}
	
	.white_play {
		color: #FFFFFF;
		margin: 0 .1rem;
	}
</style>