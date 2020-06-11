<template>
	<div>
		<div>
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive" class="indexRouter"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</div>
		<div>
			<bottomNav class="bottomNav">
				<router-link class="index-bottom-btn" to="/home">
					<tButton iconName="wap-home-o" iconColor="#000">首页</tButton>
				</router-link>
				<router-link class="index-bottom-btn" to="/bbs/club">
					<tButton iconName="comment-o" iconColor="#000">论坛</tButton>
				</router-link>
				<div class="create-icon-block">
					<div class="create-icon" @click="togglePopup"></div>
				</div>
				<router-link class="index-bottom-btn" to="/gallary/top">
					<tButton iconName="photo-o" iconColor="#000">相册</tButton>
				</router-link>
				<router-link class="index-bottom-btn" to="/mine/mine">
					<tButton iconName="user-o" iconColor="#000">我</tButton>
				</router-link>
			</bottomNav>
		</div>
		<div>
			<van-popup v-model="showPopup" position="top" :style="{ height: '30%' }" class="quickBtn">
				<div
					class="c-icon iconfont logo cust-icon"
					v-bind:class="animation.animation1"
					@click="$router.push({name:'addPostHead'})"
				>
					<tButton iconName="description" iconColor="#000" iconSize="50px">主题</tButton>
				</div>
				<div class="c-icon iconfont logo cust-icon" v-bind:class="animation.animation2">
					<tButton iconName="photograph" iconColor="#000" iconSize="50px">拍摄</tButton>
				</div>
				<div class="c-icon iconfont logo cust-icon" v-bind:class="animation.animation3">
					<tButton iconName="photo-o" iconColor="#000" iconSize="50px">相册</tButton>
				</div>
				<div class="c-icon iconfont logo cust-icon" v-bind:class="animation.animation4">
					<tButton iconName="smile-o" iconColor="#000" iconSize="50px">心情</tButton>
				</div>
			</van-popup>
		</div>
	</div>
</template>
<script>
import bottomNav from '../../components/nav/bottomNav'
import tButton from '../../components/button/tButton'
import '../../assets/icon/font_80z2swr2k45/iconfont.css'
export default {
	name: 'index',
	components: {
		bottomNav,
		tButton
	},
	data() {
		return {
			buttonImg: '@/assets/img/icon/home.png',
			showPopup: false,
			animation: {
				animation1: '',
				animation2: '',
				animation3: '',
				animation4: '',
				animation5: ''
			}
		}
	},
	methods: {
		togglePopup() {
			this.showPopup = this.showPopup ? false : true
		},
		createBtnAnimation(index) {
			let _this = this
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					_this.animation[index] = 'cust-icon-up'
					resolve()
				}, 300)
			}).then(res => {
				setTimeout(() => {
					_this.animation[index] = 'cust-icon-down'
				}, 300)
			})
		}
	},
	watch: {
		showPopup() {
			if (this.showPopup) {
				let animationArr = Object.getOwnPropertyNames(this.animation)
				let counter = 0
				for (let item of animationArr) {
					setTimeout(() => {
						this.createBtnAnimation(item)
					}, 100 * counter)
					counter++
				}
			} else {
				let animationArr = Object.getOwnPropertyNames(this.animation)
				for (let item of animationArr) {
					this.animation[item] = ''
				}
			}
		}
	},
	// computed:{
	// 	routerInclude(){
	// 		return this.$store.state.indexRouter;
	// 	}
	// },
  // beforeRouteEnter:function(to,from,next){
  //   console.log(to,from,next);
  //   next();
  // }
}
</script>
<style lang="scss" scope>
.bottomNav {
	position: fixed;
	bottom: 0;
	width: 100%;
	.index-bottom-btn {
		&:visited {
			color: transparent;
		}
		&:hover {
			color: #ff7600;
		}
	}
}
.create-icon-block {
	width: 0.8rem;
	.create-icon {
		height: 1.5rem;
		width: 1.5rem;
		background-image: linear-gradient(
			0deg,
			rgba(255, 165, 0, 0.48),
			#ff7600
		);
		border-radius: 50%;
		position: relative;
		top: -0.3rem;
		left: -0.3rem;
		transition: 1s all;
		&:before {
			content: '';
			height: 1.2rem;
			width: 0.2rem;
			background: #fff;
			position: absolute;
			left: 0.65rem;
			top: 0.15rem;
			border-radius: 0.2rem;
		}
		&::after {
			content: '';
			height: 0.2rem;
			width: 1.2rem;
			background: #fff;
			position: absolute;
			left: 0.15rem;
			top: 0.65rem;
			border-radius: 0.2rem;
		}
		&:hover {
			transform: rotate(720deg);
		}
	}
}
.cust-icon {
	transition: 0.3s all;
	filter: alpha(opacity=0);
	opacity: 0;
}
.cust-icon-up {
	transform: translateY(50px);
	filter: alpha(opacity=1);
	opacity: 1;
}
.cust-icon-down {
	transform: translateY(20px);
	filter: alpha(opacity=1);
	opacity: 1;
}
.c-icon {
	margin: 20px;
	font-size: 50px;
	display: inline-block;
}

.quickBtn {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.indexRouter {
	padding-bottom: 70px;
}
</style>