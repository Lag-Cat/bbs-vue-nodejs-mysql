<template>
	<div class="edition">
		<van-nav-bar title="版本信息" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
		<div class="edition-main">
			<div class="edition-info">
                <div>
                    <van-image :src="logoSrc" height="100px" width="100px"></van-image>
                </div>
				<div>1.0.0.0</div>
				<div>update:2020-05-8</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    name: 'about',
    data(){
        return{
            logoSrc:require('../../assets/logo.png')
        }
    }
}
</script>
<style lang="scss" scoped>
.edition {
	height: 100%;
	width: 100%;
	.edition-main {
		position: absolute;
		width: 100%;
		top: 50px;
		left: 0;
		bottom: 0;
        text-align: center;
        .edition-info{
            top:30%;
            left:28%;
            font-size: 20px;
            position: absolute;
        }
	}
}
</style>