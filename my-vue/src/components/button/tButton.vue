<template>
	<div>
		<div>
			<van-icon :name="iconName" :color="iconColor" :size="iconSize?iconSize:'0.8rem'"></van-icon>
		</div>
        <div class="tb-font">
            <slot></slot>
        </div>
	</div>
</template>
<script>
export default {
	name: 'tButton',
	props: {
        iconName:String,
        iconColor:String,
        iconSize:String
    },
    data(){
        return{
            imgSrc:null
        }
    },
    mounted(){
        this.initImg();
    },
    methods:{
        initImg(){
            if(typeof this.src==="string"){
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tb-font{
    font-size:0.35rem;
    text-align:center;
}
</style>