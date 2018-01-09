<template>
	<div v-title data-title="绑定手机" class="bind_mobile">
		<yd-cell-group>
			<yd-cell-item>
				<yd-icon slot="icon" name="phone3" size=".45rem" color="#7d7d7d"></yd-icon>
				<input type="text" slot="right" placeholder="请输入手机号码" v-model="mobile" maxlength="11">

				<!-- ↓↓关键代码是这里↓↓ -->
				<yd-sendcode slot="right" v-model="start1" @click.native="sendCode1" init-str="获取验证码" reset-str="重新获取" type="warning"></yd-sendcode>
				<!-- ↑↑关键代码是这里↑↑ -->

			</yd-cell-item>
		</yd-cell-group>
		<yd-cell-item>
			<yd-icon name="icon-verified" slot="icon" custom size=".45rem" color="#7d7d7d"></yd-icon>
			<yd-input slot="right" v-model="code" placeholder="请输入验证码"></yd-input>
		</yd-cell-item>
		<yd-button size="large" bgcolor="#42b0ff" color="#ffffff" @click.native="sumbit">提交</yd-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				start1: false,
				code: '',
				mobile: ''
			}
		},
		methods: {
			sendCode1() {
				let phone = this.mobile
				if(!(/^1[34578]\d{9}$/.test(phone))) {
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
					this.mobile = ''
				} else {
					this.$dialog.loading.open('发送中...');
					// setTimeout(() => {
						axios.post('/item/guest/send_sms',{'phone' : this.mobile})
						.then((res) => {
							if(res.data.status){
								this.start1 = true;
								this.$dialog.loading.close();
								this.$dialog.toast({
									mes: res.data.message,
									icon: 'success',
									timeout: 1500
								});
							}else {
								this.$dialog.loading.close();
								this.$dialog.toast({
									mes: res.data.message,
									icon: 'error',
									timeout: 1500
								});
							}
							
						})
						.catch((error) => {
							this.$dialog.toast({
								mes: res.data.message,
								icon: 'error',
								timeout: 1500
							});
						})
						
					// }, 1000);
				}
			},
			sumbit(){
				if(this.mobile == '' || !(/^1[34578]\d{9}$/.test(this.mobile))){
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
				}else if(this.code == ''){
					this.$dialog.toast({
						mes: '请填写验证码',
						icon: 'error',
						timeout: 1500
					});
				}else{
					// 提交绑定
					let id = this.$storage.get('userM').id;
					axios.post('/item/guest/' + id + '/check_tel',{
						phone: this.mobile, sms_code: this.code
					})
					.then((res) => {
						if(res.data.status) {
							this.$dialog.toast({
			                    mes: res.data.message,
			                    timeout: 1500,
			                    icon: 'success'
			                });
			                axios.get('/item/guest/profile')
							.then((res) => {
								// this.data = res.data;
								this.$storage.set('userM', res.data.guest);
							}).catch((error) => {
								console.log(error)
							})
							this.$router.push({name:'user'});
						}else {
							this.$dialog.toast({
			                    mes: res.data.message,
			                    timeout: 1500,
			                    icon: 'error'
			                });
						}
					})
					.catch((error) => {
						console.log(error)
					})
				}
			}
		}
	}
</script>
<style scoped>
	.bind_mobile {
		padding: .4rem .2rem;
	}
	
	.yd-cell-item {
		background: #FFFFFF;
	}
	
	.yd-btn-warning {
		background: #42b0ff;
	}
</style>
<<style>
	.yd-cell-item:not(:last-child):after{
		border-bottom:none;
	}

	.yd-cell:after{
		border-bottom:none;
	}
</style>
