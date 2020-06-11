<template>
  <div class="newsItem">
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
          <span>👍赞</span>
          <span>👎踩</span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="newsItem-main">
      <p>{{content}}</p>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  name: "newsItem",
  props: {
    userName: String,
    subInfo: String,
    content: String,
    isPostAuth: Boolean
  },
  data() {
    return {
      userPhoto: require("../../assets/logo.png")
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
        images: [src]
      });
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