<template>
	<div class="login">
		<van-image class="logo" :src="require('../../assets/logo.png')" height="100px" width="100px"></van-image>
		<van-row>
			<van-col offset="2" :span="20">
				<van-field
					v-model="userCode"
					class="cust-van-field"
					ref="userCode"
					@keypress="handleKeydown"
					placeholder="用户名"
				></van-field>
			</van-col>
		</van-row>
		<van-row>
			<van-col offset="2" :span="20">
				<van-field
					v-model="passWord"
					type="password"
					ref="password"
					class="cust-van-field"
					@keypress="handleKeydown"
					placeholder="密  码"
				></van-field>
			</van-col>
		</van-row>
		<van-row>
			<van-col offset="2" :span="20">
				<van-button class="login-button" size="large" @click="userLogin">登录</van-button>
			</van-col>
		</van-row>
		<van-row>
			<van-col offset="2" :span="20">
				<van-button size="large" @click="$router.push({name:'register'})">注册</van-button>
			</van-col>
		</van-row>
	</div>
</template>
<script>
import loginApi from '../../apis/login.js'
export default {
	name: 'login',
	data() {
		return {
			userCode: '',
			passWord: ''
		}
	},
	methods: {
		userLogin: function() {
			loginApi.userLogin(this.userCode, this.passWord).then(res => {
				if (res.state == 1) {
					this.$store.commit('setToken', res.token)
					this.$store.commit('setUserCode', res.userCode)
					this.$store.commit('setUserName', res.userName)
					this.$router.push({ name: 'index' })
				}
			})
		},
		handleKeydown: function(event) {
			if (event.keyCode == '13') {
				if (!this.userCode) {
					this.$refs.userCode.focus()
				} else if (!this.passWord) {
					this.$refs.password.focus()
				} else {
					this.userLogin()
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.login {
	position: absolute;
	width: 100%;
	top: 20%;
	.logo {
		margin: 0 auto;
		position: static;
		display: block;
		padding-bottom: 20px;
	}

	.cust-van-field {
		border: 1px solid #e9e9e9;
		margin: 5px 0;
	}

	.login-button {
		background: #00ad00;
		color: #fff;
	}
}
</style>