<template>
	<div>
		<van-nav-bar title="设置简介" left-arrow left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
		<van-field v-model="note" placeholder="填写你的简介..." type="textarea" rows="5" autosize></van-field>
		<van-button size="large" @click="sendNote" color="#00ad00">确 认</van-button>
	</div>
</template>
<script>
import usersApi from '../../apis/users.js'
export default {
	name: 'addNote',
	data() {
		return {
			note: ''
		}
	},
	created() {
		this.getNote()
	},
	methods: {
		getNote() {
			usersApi.getNote().then(res => {
				if (res.data.length > 0) {
					this.note = res.data[0].Note
				}
			})
		},
		sendNote() {
			usersApi.setNote({ note: this.note }).then(res => {
				if (res.state === 1) {
					this.$toast.success('修改成功')
					this.$store.commit('setNote', res.data[0].Note)
					setTimeout(() => {
						this.$router.push({ name: 'mine' })
					}, 1000)
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
</style>