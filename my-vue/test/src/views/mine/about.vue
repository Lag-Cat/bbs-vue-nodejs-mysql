<template>
	<div class="about">
		<van-nav-bar title="关于本站" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
		<div class="about-main">
			<div class="about-info">
                <div>
                    <van-image :src="logoSrc" height="100px" width="100px"></van-image>
                </div>
				<div>Design by Banana.</div>
				<div>2020-05-8</div>
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
.about {
	height: 100%;
	width: 100%;
	.about-main {
		position: absolute;
		width: 100%;
		top: 50px;
		left: 0;
		bottom: 0;
        text-align: center;
        .about-info{
            top:30%;
            left:28%;
            font-size: 20px;
            position: absolute;
        }
	}
}
</style>