<template>
	<div>
		<van-nav-bar title="我的" right-text="设置" @click-right="$router.push({name:'settings'})"></van-nav-bar>
		<van-cell is-link>
			<van-row>
				<van-col :span="6">
					<div>
						<van-image :src="testImage" round height="50px" width="50px"></van-image>
					</div>
				</van-col>
				<van-col :span="18">
					<div>
						<div>蕉丶</div>
						<div>这个人很懒，什么都没留下。</div>
					</div>
				</van-col>
			</van-row>
		</van-cell>
		<van-cell>
			<van-row class="quick-btn">
				<van-col :span="6" @click="$router.push({name:'focus'})">
					<div>70</div>
					<div>关注</div>
				</van-col>
				<van-col :span="6"  @click="$router.push({name:'fans'})">
					<div>225</div>
					<div>粉丝</div>
				</van-col>
				<van-col :span="6">
					<div>101</div>
					<div>兴趣领域</div>
				</van-col>
				<van-col :span="6">
					<div>879</div>
					<div>帖子</div>
				</van-col>
			</van-row>
		</van-cell>
		<van-cell is-link>
			<div>我的收藏</div>
		</van-cell>
		<van-cell is-link>
			<div>浏览历史</div>
		</van-cell>
		<van-cell is-link title="测试用" @click="$router.push({name:'iconList'})"></van-cell>
	</div>
</template>
<script>
export default {
	name: 'mine',
	data() {
		return {
			testImage: require('../../assets/logo.png')
		}
	}
}
</script>
<style lang="scss" scoped>
.quick-btn{
    text-align: center;
}
</style>