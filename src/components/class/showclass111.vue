<template>
	<div v-title data-title="视频播放">
		<video id="video" controls="controls" src="http://maoyan.meituan.net/movie/videos/ad429561494a4eb09de1c007f037c847.mp4" preload="auto" playsinline x-webkit-airplay webkit-playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="landscape|portrait" type="video/mp4" style="object-fit:fill;" width="100%" height="100%"></video>
	</div>
</template>

<script>
	export default {
		created() {

		},
		data() {
			return {
				
			}
		},
		methods: {
			
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