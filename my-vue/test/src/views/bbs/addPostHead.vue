<template>
  <div>
    <div>
      <van-popup v-model="showUserList" position="right" :style="{ height: '100%',width:'100%' }">
        <userList :isPage="false" @onBackClick="handleUserListBackClick"></userList>
      </van-popup>
    </div>
    <van-nav-bar title="发布主题" left-text="返回" @click-left="$router.go(-1)" right-text="发布" @click-right="handleSendClick"></van-nav-bar>
    <van-cell>
      <van-field v-model="title" placeholder="请输入标题..."></van-field>
    </van-cell>
    <van-cell>
      <van-field v-model="body" type="textarea" autosize rows="2" placeholder="请输入内容..."></van-field>
    </van-cell>
    <van-cell>
      <van-uploader v-model="img"></van-uploader>
    </van-cell>
    <postToolBar
      @onEmotionClick="handleEmotionClick"
      @onUserSelectorClick="handleUserSelectorClick"
    >
      <emojiSelector slot="footer" v-show="showEmotion" @Select="handleEmojiSelected"></emojiSelector>
    </postToolBar>
  </div>
</template>
<script>
import emojiSelector from "../../components/emoji/lib/emoji";
import postToolBar from "../../components/panel/postToolBar";
import userList from '../../components/panel/userList';
import PostHeader from '../../entity/postheader.js'
import postApis from '../../apis/post.js'
export default {
  name: "addPostHead",
  components: {
    emojiSelector,
    postToolBar,
    userList
  },
  data() {
    return {
      title: "",
      body: "",
      img: [],
      showEmotion: false,
      showUserList: false,
      
    };
  },
  methods: {
    handleEmotionClick: function() {
      this.showEmotion = this.showEmotion ? false : true;
    },
    handleEmojiSelected: function(name) {
      this.body+="::"+name;
    },
    handleUserSelectorClick: function() {
      this.showUserList=true;
    },
    handleUserListBackClick: function() {
      this.showUserList=false;
    },
    handleSendClick:function(){
      postApis.addPost(new PostHeader({
        PostTitle:this.title,
        PostTopBody:this.PostTopBody
      })).then(res=>{
        if(res.state==1){
          this.$toast.success('成功发送');
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell {
  padding: 4px;
}
</style>