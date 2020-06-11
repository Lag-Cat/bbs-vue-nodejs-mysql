<template>
	<div>
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了..." @load="onLoad">
				<newsItem v-for="(item,key) in list" :key="key" :info="item" :overLength="100"></newsItem>
				<van-skeleton title avatar :row="4" :loading="skeletonLoading" />
				<van-skeleton title avatar :row="4" :loading="skeletonLoading" />
				<van-skeleton title avatar :row="4" :loading="skeletonLoading" />
				<van-skeleton title avatar :row="4" :loading="skeletonLoading" />
				<van-skeleton title avatar :row="4" :loading="skeletonLoading" />
			</van-list>
		</van-pull-refresh>
	</div>
</template>
<script>
import newsItem from '../../components/panel/newsItem'
export default {
	name: 'home',
	components: {newsItem},
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			refreshing: false,
			skeletonLoading: false
		}
	},
	created(){
		this.getNewsList();
	},
	mounted() {},
	methods: {
		onLoad() {
			let _this = this
			this.skeletonLoading = true
			
			this.loading = false
		},
		onRefresh() {},
		getNewsList(){
			this.list.push({
				username:"banana",
				subInfo:"4小时前 xxx",
				content:"“日本大学生因疫情无法打工遇到经济困难，导致无法交学费问题，大学生们进行了要求学费减少一半的网上签名活动，4月30日学生团体代表带着1万663名的签名，访问了文部科学省亀岡偉民副大臣，大臣说会尽力解决学生们的要求。学生团体代表说这样下去的话会有很多学生因经济问题而退学。",
				picList:[
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201706/02/20170602214244_fLr3U.thumb.1000_0.png"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201806/01/20180601201451_F3stS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
				]
			})
			this.list.push({
				username:"banana",
				subInfo:"4小时前 xxx",
				content:"“日本大学生因疫情无法打工遇到经济困难，导致无法交学费问题，大学生们进行了要求学费减少一半的网上签名活动，4月30日学生团体代表带着1万663名的签名，访问了文部科学省亀岡偉民副大臣，大臣说会尽力解决学生们的要求。学生团体代表说这样下去的话会有很多学生因经济问题而退学。",
				picList:[
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201706/02/20170602214244_fLr3U.thumb.1000_0.png"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201806/01/20180601201451_F3stS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
				]
			})
			this.list.push({
				username:"banana",
				subInfo:"4小时前 xxx",
				content:"“日本大学生因疫情无法打工遇到经济困难，导致无法交学费问题，大学生们进行了要求学费减少一半的网上签名活动，4月30日学生团体代表带着1万663名的签名，访问了文部科学省亀岡偉民副大臣，大臣说会尽力解决学生们的要求。学生团体代表说这样下去的话会有很多学生因经济问题而退学。",
				picList:[
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201706/02/20170602214244_fLr3U.thumb.1000_0.png"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201806/01/20180601201451_F3stS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
					{
						alt:"",
						title:"",
						src:"https://c-ssl.duitang.com/uploads/item/201902/27/20190227182514_sxllS.thumb.1000_0.jpeg"
					},
				]
			})
		
		}
	}
}
</script>
<style lang="scss" scoped>
</style>