<template>
	<van-row class="sorter">
		<van-col span="12">
			<van-tabs v-model="active" class="left-nav">
				<van-tab title="全部回复"></van-tab>
				<van-tab title="只看楼主"></van-tab>
			</van-tabs>
		</van-col>
		<van-col offset="6" span="6">
			<van-dropdown-menu class="right-sorter" active-color="#0000ff">
				<van-dropdown-item v-model="value" :options="options"></van-dropdown-item>
			</van-dropdown-menu>
		</van-col>
	</van-row>
</template>
<script>
export default {
	name: 'sorter',
	data() {
		return {
			active: '1',
			value: 0,
			options: [
				{ text: '热门排序', value: 0 },
				{ text: '正序排序', value: 1 },
				{ text: '倒序排序', value: 2 }
			]
		}
	}
}
</script>
<style lang="scss" scoped>
.sorter {
    height:0.7rem;
    background:#fff;
    .left-nav>>>.van-tabs__nav{
        height: 0.6rem!important;
    }
    .left-nav>>>.van-tab {
        line-height: 0.6rem!important;
    }
    .left-nav>>>.van-tabs__nav{
        padding:0;
    }
    .left-nav>>>.van-tabs__line{
        bottom:0;
        z-index: 0;
    }
    .left-nav>>>.van-tabs__wrap{
        height:inherit!important;
    }
	.right-sorter >>> .van-dropdown-menu__bar {
        height:0.6rem;
		box-shadow: none !important;
	}
}
</style>