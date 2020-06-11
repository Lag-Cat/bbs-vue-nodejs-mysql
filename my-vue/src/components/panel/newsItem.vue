<template>
  <div class="newsItem">
    <div class="newsItem-header">
      <div class="newsItem-photo">
        <van-image round :src="userPhoto" height="1rem" width="1rem"></van-image>
      </div>
      <div class="newsItem-userInfo">
        <div>
          <div>{{v_userName}}</div>
          <div>
            <span>{{v_subInfo}}</span>
          </div>
        </div>
        <div v-if="showMark?true:false" class="newsItem-mark">
          <van-button size="small">关注</van-button>
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
    <div class="newsItem-picList" v-if="picList.length>0">
      <van-image
        class="newsItem-picItem"
        v-for="(item,key) in picList"
        :src="item"
        :key="key"
        :height="picHeight"
        :width="picWidth"
        fit="contain"
        @click="handlePicClick(item)"
      ></van-image>
    </div>
    <div class="newsItem-footer" v-if="!hideFooter">
      <div class="footer-btn">转发</div>
      <div class="footer-btn">评论</div>
      <div class="footer-btn">赞</div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  name: "newsItem",
  props: {
    overLength: Number,
    showAllClick: Function,
    userName: String,
    subInfo: String,
    content: String,
    picList: Array,
		showMark: Boolean,
    picDisplayType:String,
    hideFooter:Boolean
  },
  data() {
    return {
      userPhoto: require("../../assets/logo.png"),
      isOverLength: false,
      contentText: "",
      showContentText: "",
      v_userName: this.userName,
      v_subInfo: this.subInfo,
      v_content: this.content,
			v_picList: this.picList,
			picWidth:'2rem',
			picHeight:'2rem'
    };
  },
  created() {
		this.loadContent();
			if(this.picDisplayType && this.picDisplayType==='fullWidth'){
			this.picWidth='98%';
			this.picHeight=''
    }
    
    
  },
  mounted() {},
  methods: {
    handleShowAll() {
      if (this.showAllClick) {
        this.showAllClick();
      } else {
        this.showContent();
      }
    },
    showContent() {
      this.showContentText = this.content;
      this.isOverLength = false;
    },
    loadContent() {
      let overLength = this.overLength ? this.overLength : 50;

      if (this.content && overLength >= 0 && this.content.length > overLength) {
        this.showContentText = this.content.substr(0, overLength);
        this.isOverLength = true;
      } else {
        this.showContentText = this.content;
        this.isOverLength = false;
      }
    },
    handlePicClick: function(src) {
      ImagePreview({
        images: [src]
      });
    }
  },
  watch: {
    content: function(val) {
      this.loadContent();
    },
    userName: function(val) {
      this.v_userName = val;
    },
    subInfo: function(val) {
      this.v_subInfo = val;
    },
    picList: function(val) {
      this.v_picList = val;
    }
  }
};
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
  .newsItem-footer {
    overflow: auto;
    .footer-btn {
      width: 32%;
      float: left;
      text-align: center;
    }
  }
}
</style>