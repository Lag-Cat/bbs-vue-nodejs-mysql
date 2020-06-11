<template>
	<div>
		<van-nav-bar left-text="返回" left-arrow title="注册" @click-left="$router.go(-1)"></van-nav-bar>
		<van-field label="用 户 号" v-model="registerInfo.userCode" required placeholder="（必填）"></van-field>
		<van-field label="昵    称" v-model="registerInfo.userName" placeholder></van-field>
		<van-field
			label="密    码"
			v-model="registerInfo.passWord"
			required
			type="password"
			placeholder="（必填）"
		></van-field>
		<van-field
			label="确认密码"
			v-model="registerInfo.confirmPassWord"
			required
			type="password"
			placeholder="（必填）"
		></van-field>
		<div class="classify-block"></div>
		<van-field label="邮    箱" v-model="registerInfo.email" placeholder></van-field>
		<van-field label="手 机 号" v-model="registerInfo.phone" required type="tel" placeholder="（必填）"></van-field>
		<div class="classify-block"></div>
		<van-field label="验证码" v-model="registerInfo.checkNumber" placeholder></van-field>
		<div class="classify-block"></div>
		<van-button size="large" color="#17c500" @click="register">注册</van-button>
	</div>
</template>
<script>
import loginApis from '../../apis/login.js'
export default {
	name: 'registers',
	data() {
		return {
			registerInfo: {
				userCode: '',
				userName: '',
				passWord: '',
				confirmPassWord: '',
				email: '',
				phone: '',
				checkNumber: ''
			}
		}
	},
	methods: {
		checkData: function() {
			if (!this.registerInfo.userCode) {
				this.$toast.fail('请填写用户号')
				return false
			}
			if (!this.registerInfo.passWord) {
				this.$toast.fail('请填写密码')
				return false
			}
			if (!this.registerInfo.confirmPassWord) {
				this.$toast.fail('请确认密码')
				return false
			}
			if (
				this.registerInfo.passWord !== this.registerInfo.confirmPassWord
			) {
				this.$toast.fail('密码不一致，请检查。')
				return false
			}
			if (!this.registerInfo.phone) {
				this.$toast.fail('请填写手机号')
				return false
			}
			if (!this.registerInfo.checkNumber) {
				this.$toast.fail('请填写验证码')
				return false
			}
			return true
		},
		register: function() {
			if (this.checkData()) {
				loginApis.register(this.registerInfo).then(res => {
					this.$toast.success('注册成功')
					setTimeout(() => {
						this.$router.push({ name: 'login' })
					}, 1000 * 0.5)
				})
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.classify-block {
	height: 10px;
	width: 100%;
	background: #e9e9e9;
}
</style>