<template>
  <div class="newsItem" v-bind:style="hideBorderBottom?'border-bottom: none;':''">
    <div class="newsItem-header">
      <div class="newsItem-photo">
        <van-image round :src="userPhoto" height="1rem" width="1rem"></van-image>
      </div>
      <div class="newsItem-userInfo">
        <div>
          <div class="userName">
            <span>{{userName}}</span>
            <span>
              <van-tag plain v-if="isPostAuth">楼主</van-tag>
            </span>
          </div>
          <div class="subInfo">{{subInfo}}</div>
        </div>
        <div class="newsItem-mark">
          <span @click.stop="handleGoodClick">赞({{good?good:0}})</span>
          <span @click.stop="handleBadClick">踩({{bad?bad:0}})</span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="newsItem-main">
      <p>
        {{showContentText}}
        <commTextPanel :content="showContentText"></commTextPanel>
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
        :src="item"
        :key="key"
        :height="picHeight"
        :width="picWidth"
        fit="contain"
        @click="handlePicClick(item)"
      ></van-image>
    </div>
    <div class="response" v-if="showResponse">
      <slot></slot>
      <div class="more">
        <span v-if="more">
          <span>查看更多</span>
          <span v-if="moreNumber">
            <span>{{moreNumber}}</span>
            <span>条消息</span>
          </span>
          <span>...</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import commTextPanel from './commTextPanel'
export default {
  name: "newsItem",
  props: {
    overLength: Number,
    showAllClick: Function,
    userName: String,
    subInfo: String,
    content: String,
    picList: Array,
    isPostAuth: Boolean,
    picDisplayType: String,
    showResponse: Boolean,
    more: Boolean,
    moreNumber: Number,
    hideBorderBottom: Boolean,
    good: Number,
    bad: Number
  },
  components:{
    commTextPanel
  },
  data() {
    return {
      userPhoto: require("../../assets/logo.png"),
      isOverLength: false,
      contentText: "",
      showContentText: "",
      picWidth: "2rem",
      picHeight: "2rem"
    };
  },
  created() {
    this.hideContent();
    if (this.picList) {
      this.picList = this.picList;
    }

    if (this.picDisplayType && this.picDisplayType === "fullWidth") {
      this.picWidth = "95%";
      this.picHeight = "";
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
    hideContent() {
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
        images: [src],
        startPosition: 1,
        onClose() {
          // do something
        }
      });
    },
    handlePicClick: function(src) {
      ImagePreview({
        images: [src]
      });
    },
    handleGoodClick: function() {
      this.$emit("onGoodClick");
    },
    handleBadClick: function() {
      this.$emit("onBadClick");
    }
  }
};
</script>
<style lang="scss" scoped>
.newsItem {
  margin: 15px 10px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 10px;
  .newsItem-header {
    position: relative;
    .newsItem-photo {
      display: inline-block;
    }
    .newsItem-userInfo {
      display: inline-block;
      vertical-align: top;
      .userName {
        line-height: 20px;
      }
      .subInfo {
        line-height: 20px;
        color: #969696;
      }
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
      margin: 10px;
    }
  }
  .newsItem-main {
    padding-left: 40px;
  }

  .response {
    margin-left: 40px;
    background: #fdfdfd;
    border: 1px solid #e2e2e2;
    .more {
      font-size: 13px;
      color: #1c64ff;
    }
  }
}
</style>