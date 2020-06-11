<template>
  <div>
    <div>
      <van-popup v-model="showUserList" position="right" :style="{ height: '100%',width:'100%' }">
        <userList :isPage="false" @onBackClick="handleUserListBackClick"></userList>
      </van-popup>
      <van-popup v-model="showClubList" position="right" :style="{ height: '100%',width:'100%' }">
        <clubList
          :isPage="false"
          @onBackClick="handleClubListBackClick"
          @onItemClick="handleClubItemClick"
        ></clubList>
      </van-popup>
    </div>
    <van-nav-bar
      title="发布主题"
      left-text="返回"
      @click-left="$router.go(-1)"
      left-arrow
      right-text="发布"
      @click-right="handleSendClick"
    ></van-nav-bar>
    <van-cell>
      <van-field v-model="title" placeholder="请输入标题..."></van-field>
    </van-cell>
    <van-cell>
      <van-field v-model="body" type="textarea" autosize rows="2" placeholder="请输入内容..."></van-field>
    </van-cell>
    <van-cell>
      <van-uploader
        class="upload-file"
        v-model="img"
        multiple="true"
        preview-size="75px"
        :max-count="10"
        :after-read="handleUploadFile"
      ></van-uploader>
    </van-cell>
    <div class="club">
      <van-tag round v-if="this.clubId?true:false">{{clubName?clubName:'没名字呢..'}}</van-tag>
    </div>
    <postToolBar class="postToolBar"
      @onEmotionClick="handleEmotionClick"
      @onUserSelectorClick="handleUserSelectorClick"
      @onEmojiSelected="handleEmojiSelected"
      @onClubSelectorClick="handleClubSelectorClick"
      club
    ></postToolBar>
  </div>
</template>
<script>
import emojiSelector from "../../components/emoji/lib/emoji";
import postToolBar from "../../components/panel/postToolBar";
import userList from "../../components/panel/userList";
import clubList from "../../components/service/clubList";
import PostHeader from "../../entity/postheader.js";
import postApis from "../../apis/post.js";
import filesApis from "../../apis/files.js";
import util from "../../util/util.js";
export default {
  name: "addPostHead",
  components: {
    emojiSelector,
    postToolBar,
    userList,
    clubList
  },
  data() {
    return {
      title: "",
      body: "",
      clubId: "",
      clubName: "",
      img: [],
      showEmotion: false,
      showUserList: false,
      showClubList: false,
      imageIdList: []
    };
  },
  created() {
    this.clubId = this.$route.query.clubId ? this.$route.query.clubId : "";
    this.clubName = this.$route.query.clubName
      ? this.$route.query.clubName
      : "";
  },
  methods: {
    handleEmotionClick: function() {
      this.showEmotion = this.showEmotion ? false : true;
    },
    handleEmojiSelected: function(name) {
      this.body += name;
    },
    handleUserSelectorClick: function() {
      this.showUserList = true;
    },
    handleUserListBackClick: function() {
      this.showUserList = false;
    },
    handleClubSelectorClick: function() {
      this.showClubList = true;
    },
    handleClubListBackClick: function() {
      this.showClubList = false;
    },
    handleClubItemClick: function(info) {
      this.clubId = info.clubId;
      this.clubName = info.clubName;
      this.showClubList = false;
    },
    handleSendClick: function() {
      if (!this.clubId) {
        this.$toast.fail("请选择想发到的部落");
        return false;
      }
      postApis
        .addPost(
          new PostHeader({
            PostTitle: this.title,
            PostTopBody: this.body,
            PostTopImage: this.imageIdList,
            BBSAreaId: this.clubId,
            BBSAreaName: this.clubName
          })
        )
        .then(res => {
          if (res.state == 1) {
            this.$toast.success("成功发送");
            setTimeout(() => {
              this.$router.replace({
                name: "postDetail",
                query: {
                  postId: res.postId
                }
              });
            }, 1000);
          }
        });
    },
    handleUploadFile: function(files) {
      let filesArr = [];
      if (util.isArray(files)) {
        //判断是单文件还是多文件
        files.map(file => {
          filesArr.push(file.file);
        });
      } else {
        filesArr.push(files.file);
      }
      filesApis.uploadFile(filesArr).then(
        res => {
          res.data.data.map(item => {
            this.imageIdList.push(item.id);
          });
        },
        err => {
          this.$toast.fail("文件上传失败");
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell {
  padding: 4px;
}

.upload-file {
  margin: 9px;
}

.club{
  margin:5px;
}

.postToolBar{
  position:fixed;
  bottom:0;
}
</style>