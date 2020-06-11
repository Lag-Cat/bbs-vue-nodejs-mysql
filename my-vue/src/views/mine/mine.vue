<template>
	<div>
		<van-nav-bar title="我的" right-text="设置" @click-right="$router.push({name:'settings'})"></van-nav-bar>
		<van-cell is-link @click="$router.push({name:'setNote'})">
			<van-row>
				<van-col :span="6">
					<div>
						<van-image :src="userInfo.testImage" round height="50px" width="50px"></van-image>
					</div>
				</van-col>
				<van-col :span="18">
					<div>
						<div>{{userInfo.userName}}</div>
						<div>{{userInfo.note?userInfo.note:'这个人很懒，什么都没留下。'}}</div>
					</div>
				</van-col>
			</van-row>
		</van-cell>
		<van-cell>
			<van-row class="quick-btn">
				<van-col :span="6" @click="$router.push({name:'focus'})">
					<div>{{userInfo.count.focusCount}}</div>
					<div>关注</div>
				</van-col>
				<van-col :span="6" @click="$router.push({name:'fans'})">
					<div>{{userInfo.count.fansCount}}</div>
					<div>粉丝</div>
				</van-col>
				<van-col :span="6">
					<div>{{userInfo.count.clubCount}}</div>
					<div>兴趣领域</div>
				</van-col>
				<van-col :span="6">
					<div>{{userInfo.count.responseCount+userInfo.count.postCount}}</div>
					<div>帖子</div>
				</van-col>
			</van-row>
		</van-cell>
		<van-cell is-link>
			<div>我的收藏</div>
		</van-cell>
		<van-cell is-link @click="$router.push({name:'testPage'})">
			<span>浏览历史</span>
		</van-cell>
		<van-cell is-link title="测试用" @click="$router.push({name:'iconList'})"></van-cell>
	</div>
</template>
<script>
import userApis from '../../apis/users.js'
export default {
	name: 'mine',
	data() {
		return {
			userInfo:{
				testImage: require('../../assets/logo.png'),
				userName:"",
				note: '',
				count:{
					clubCount:0,
					postCount:0,
					responseCount:0,
					focusCount:0,
					fansCount:0
				}
			},
		}
	},
	created() {
		this.userInfo.userName = this.$store.state.userName
		this.userInfo.note = this.$store.state.note
		if (!this.userInfo.userName || !this.userInfo.note) {
			//如果没有保存的信息，则重新获取数据
		}
		this.getCount();
	},
	computed: {
		c_note() {
			return this.$store.state.note
		}
	},
	watch: {
		c_note(val) {
			this.userInfo.note = val
		}
	},
	methods: {
		getUserInfo() {},
		getCount:function(){
			userApis.getUserCount().then(res=>{
				this.userInfo.count.clubCount=res[0].clubCount?res[0].clubCount:0;
				this.userInfo.count.postCount=res[0].clubCount?res[0].postCount:0;
				this.userInfo.count.responseCount=res[0].clubCount?res[0].responseCount:0;
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.quick-btn {
	text-align: center;
}
</style>