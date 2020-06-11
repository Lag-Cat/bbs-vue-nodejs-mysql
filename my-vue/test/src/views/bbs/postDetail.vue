<template>
  <div>
    <div>
      <van-popup v-model="showUserList" position="right" :style="{ height: '100%',width:'100%' }">
        <userList :isPage="false" @onBackClick="handleUserListBackClick"></userList>
      </van-popup>
    </div>
    <van-nav-bar
      :fixed="true"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="handleLeftClick"
    ></van-nav-bar>
    <div class="post-master">
      <newsItem
        :userName="postTop.ResponseName"
        :subInfo="''"
        :content="postTop.PostItemBody"
        :picList="postTop.AttachmentList"
        :overLength="-1"
      ></newsItem>
    </div>
    <van-sticky :offset-top="40">
      <sorter class="sorter"></sorter>
    </van-sticky>
    <div class="post-main-response">
      <postItem
        v-for="(item,key) in postBody"
        :key="key"
        :overLength="-1"
        :userName="item.ResponseName"
        :subInfo="''"
        :content="item.PostItemBody"
        :picList="item.AttachmentPath"
        @click.native="onItemClick(item)"
      ></postItem>
    </div>
    <div class="response">
      <van-row class="respone-i">
        <van-col :span="20">
          <van-field @click="handleResponseClick" v-model="sendText" placeholder="说说你的看法..."></van-field>
        </van-col>
        <van-col :span="4" class="response-send">
          <div @click="handleSendClick">发送</div>
        </van-col>
      </van-row>
      <div class="tools-bar" v-show="showToolsBar">
        <div class="tools-header">
          <div>
            <van-icon name="chat-o" size="0.9rem" @click="handleEmotionClick"></van-icon>
          </div>
          <div>
            <van-icon name="chat-o" size="0.9rem" @click="handleUserSelectorClick"></van-icon>
          </div>
          <div>
            <van-icon name="chat-o" size="0.9rem"></van-icon>
          </div>
          <div>
            <van-icon name="chat-o" size="0.9rem"></van-icon>
          </div>
          <div>
            <van-icon name="chat-o" size="0.9rem"></van-icon>
          </div>
          <div>
            <van-icon name="chat-o" size="0.9rem"></van-icon>
          </div>
        </div>
        <div>
          <emojiSelector v-show="showEmotion" @Select="handleEmojiSelected"></emojiSelector>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import newsItem from "../../components/panel/newsItem";
import postItem from "../../components/panel/postItem";
import sorter from "../../components/panel/sorter";
import emojiSelector from "../../components/emoji/lib/emoji";
import userList from "../../components/panel/userList";
import postApis from "../../apis/post.js";
import util from "../../util/util.js";
export default {
  name: "postDetail",
  components: {
    newsItem,
    postItem,
    sorter,
    emojiSelector,
    userList
  },
  data() {
    return {
      title: "",
      postId: "",
      rows: 10,
      page: 0,
      postTop: {
        ResponseName: "",
        PostTitle: "",
        PostItemBody: "",
        AttachmentList: []
      },
      postBody: [],
      sendText: "",
      showToolsBar: false,
      showEmotion: false,
      showUserList: false,
      scrollEventLock: true,
      responseTarget: ""
    };
  },
  created() {
    this.postId = this.$route.query.postId;
    this.responseTarget = this.postId;
    this.getPostBody();
  },
  methods: {
    getPostBody() {
      postApis.getPostBodyById(this.postId, this.rows, this.page).then(res => {
        if (res && res.length > 0) {
          this.postTop = util.extend(this.postTop, res[0], true);
          for (let i = 1; i < res.length; i++) {
            this.postBody.push(res[i]);
          }
        } else {
          this.$toast.fail("该帖不存在或者已经删除");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000 * 3);
        }
      });
    },
    handleLeftClick() {
      this.$router.go(-1);
    },
    handleResponseClick() {
      this.showToolsBar = true;
    },
    onItemClick(item) {
      this.showToolsBar = true;
    },
    handleSendClick() {
      postApis
        .addPostBody({
          PostItemBody: this.sendText,
          PostId: this.postId,
          ParentPostItemId: this.responseTarget
        })
        .then(res => {
          if (res.state === 1) {
            this.postBody.push(res.data[0]);
          }
        });
    },
    handleEmotionClick() {
      this.showEmotion = true;
    },
    handleEmojiSelected(name) {
      this.sendText += "::" + name;
    },
    handleUserSelectorClick() {
      this.showUserList = true;
      this.scrollEventLock = true;
    },
    handleUserListBackClick() {
      this.scrollEventLock = false;
      this.showUserList = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener(
        "scroll",
        () => {
          if (!this.scrollEventLock) this.showToolsBar = false;
        },
        true
      );
    });
  }
};
</script>
<style lang="scss" scoped>
.post-master {
  margin-top: 1.5rem;
}
.sorter {
  box-shadow: 0 3px 1px 1px #f3f3f3;
}
.post-main-response {
  margin-bottom: 1.2rem;
}
.response {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  .respone-i {
    border-top: 1px solid #e9e9e9;
  }

  .response-send {
    line-height: 1.2rem;
    text-align: center;
    font-size: 0.4rem;
    color: #9e9e9e;
  }

  .tools-bar {
    .tools-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0.1rem 0.7rem;
    }
  }
}
</style>