<template>
	<div class="userList">
		<van-nav-bar left-text="返回" left-arrow @click-left="handleLeftClick" :fixed="true"></van-nav-bar>
		<van-list class="userlist-list" :finished="finished" v-model="loading" @load="onLoad">
			<div v-for="(item,key) in list" :key="key">
				<van-row>
					<van-col :span="6">
						<van-image round :src="testImage" height="40px" width="40px"></van-image>
					</van-col>
					<van-col :span="12">{{item.name}}</van-col>
					<van-col :span="6">
						<van-button size="small">关注</van-button>
					</van-col>
				</van-row>
			</div>
		</van-list>
	</div>
</template>
<script>
export default {
	name: 'userList',
	props: {
		isPage: Boolean
	},
	data() {
		return {
			list: [
				{
					name: 'apple'
				},
				{
					name: 'pick'
				},
				{
					name: 'watermelon'
				},
				{
					name: 'pear'
				},
				{
					name: 'apple'
				},
				{
					name: 'pick'
				},
				{
					name: 'watermelon'
				},
				{
					name: 'pear'
				},
				{
					name: 'apple'
				},
				{
					name: 'pick'
				},
				{
					name: 'watermelon'
				},
				{
					name: 'pear'
				},
				{
					name: 'apple'
				},
				{
					name: 'pick'
				},
				{
					name: 'watermelon'
				},
				{
					name: 'pear'
				},
				{
					name: 'apple'
				},
				{
					name: 'pick'
				},
				{
					name: 'watermelon'
				},
				{
					name: 'pear'
				},
				{
					name: 'apple'
				},
				{
					name: 'pick'
				},
				{
					name: 'watermelon'
				},
				{
					name: 'pear'
				},
				{
					name: 'apple'
				},
				{
					name: 'pick'
				},
				{
					name: 'watermelon'
				},
				{
					name: 'pear'
				}
			],
			loading: false,
			finished: false,
			testImage: require('../../assets/logo.png')
		}
	},
	methods: {
		onLoad() {},
		handleLeftClick() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="scss" scoped>
.userList {
	background: #fff;
    padding:50px 0 0 0;
	.userlist-list {
		width: 100%;
		padding: 10px 0 0 0;
	}
}
</style>