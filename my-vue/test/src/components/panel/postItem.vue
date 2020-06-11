<template>
	<div class="newsItem">
		<div class="newsItem-header">
			<div class="newsItem-photo">
				<van-image round :src="userPhoto" height="1rem" width="1rem"></van-image>
			</div>
			<div class="newsItem-userInfo">
				<div>
					<div>{{userName}}</div>
					<div>
						<span>{{subInfo}}</span>
					</div>
				</div>
				<div class="newsItem-mark">
					<span>👍赞</span>
					<span>👎踩</span>
				</div>
			</div>
		</div>
		<div class="newsItem-main">
			<p>
				{{showContentText}}
				<span v-if="isOverLength">...</span>

				<a href="#" @click="handleShowAll">
					<span v-if="isOverLength">全部</span>
				</a>
			</p>
		</div>
		<div class="newsItem-picList" v-if="picList">
			<van-image
				class="newsItem-picItem"
				v-for="(item,key) in picList"
				:src="item.src"
				:key="key"
				height="2rem"
				width="2rem"
				fit="contain"
			></van-image>
		</div>
	</div>
</template>
<script>
export default {
	name: 'newsItem',
	props: {
		overLength: Number,
		showAllClick: Function,
		userName:String,
		subInfo:String,
		content:String,
		picList: Array
	},
	data() {
		return {
			userPhoto: require('../../assets/logo.png'),
			isOverLength: false,
			contentText: '',
			showContentText: '',
		}
	},
	created() {
		this.hideContent()
		if (this.picList) {
			this.picList = this.picList
		}
	},
	mounted() {},
	methods: {
		handleShowAll() {
			if (this.showAllClick) {
				this.showAllClick()
			} else {
				this.showContent()
			}
		},
		showContent() {
			this.showContentText = this.content
			this.isOverLength = false
		},
		hideContent() {
			let overLength = this.overLength ? this.overLength : 50

			if (
				this.content &&
				overLength >= 0 &&
				this.content.length > overLength
			) {
				this.showContentText = this.content.substr(0, overLength)
				this.isOverLength = true
			} else {
				this.showContentText = this.content
				this.isOverLength = false
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.newsItem {
	margin: 0.4rem;
	border-bottom: 1px solid #e9e9e9;
	padding-bottom: 0.2rem;
	.newsItem-header {
		position: relative;
		.newsItem-photo {
			display: inline-block;
		}
		.newsItem-userInfo {
			display: inline-block;
			vertical-align: top;
		}
		.newsItem-mark {
			position: absolute;
			float: right;
			right: 0;
			top: 0;
		}
	}
	.newsItem-picList {
		.newsItem-picItem {
			background: black;
			margin: 0.1rem;
		}
	}
}
</style>