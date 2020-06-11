<template>
	<div>
		<van-nav-bar title="设置" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
		<van-cell is-link title="账号管理" />
		<div class="c-slice"></div>
		<van-cell class="personal-settings" is-link>
			<van-row>
				<van-col :span="20" class="personal-settings-text">个人资料</van-col>
				<van-col :span="4" class="personal-settings-imgBox">
					<van-image src="../../assets/logo.png" height="30px" width="30px"></van-image>
				</van-col>
			</van-row>
		</van-cell>
		<van-cell is-link title="我的账号" />
		<div class="c-slice"></div>
		<van-cell is-link title="浏览设置" />
        <div class="c-slice"></div>
		<van-cell is-link title="版本信息" @click="$router.push({name:'edition'})" />
		<van-cell is-link title="关于本站" @click="$router.push({name:'about'})" />
		<van-cell>
			<van-button class="loginOut-btn" size="large" color="#ff0000">退出登录</van-button>
		</van-cell>
	</div>
</template>
<script>
export default {
	name: 'settings'
}
</script>
<style lang="scss" scoped>
.personal-settings {
	.personal-settings-text {
		line-height: 30px;
	}
    .personal-settings-imgBox{
        height:30px;
    }
}
.c-slice {
	height: 5px;
	width: 100%;
	background: #e9e9e9;
}
</style>