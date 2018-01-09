<template>
		<yd-tabbar fixed="fixed" activeColor="rgb(41, 182, 246)">
			<yd-tabbar-item title="课程" link="/" :active="index">
				<yd-icon name="icon-ic_ondemand_video" slot="icon" custom size="0.54rem"></yd-icon>
			</yd-tabbar-item>
			<yd-tabbar-item title="" link="/learning">
				<yd-icon name="play-show" slot="icon" custom size="1.04rem"></yd-icon>
			</yd-tabbar-item>
			<yd-tabbar-item title="我的" link="/userall/user" :active="user">
				<yd-icon name="account" slot="icon" custom size="0.54rem"></yd-icon>
			</yd-tabbar-item>
		</yd-tabbar>
</template>
<script>
	export default {
		created() {

		},
		data() {
			return {
				fixed: true
			}
		},
		methods: {

		},
		props: ['index', 'user'],
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>