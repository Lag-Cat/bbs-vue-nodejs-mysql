<template>
  <div class="postDetail">
    <div>
      <van-popup v-model="showUserList" position="right" :style="{ height: '100%',width:'100%' }">
        <userList :isPage="false" @onBackClick="handleUserListBackClick"></userList>
      </van-popup>
      <van-popup
        v-model="showResponse"
        position="bottom"
        :style="{ height: '90%'}"
        class="response"
      >
        <responseList v-if="showResponse" :header="reponsePanelHeader"></responseList>
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
        :userName="postTop.CreateName"
        :subInfo="postTop.CreateDate | datetime2String('recently')"
        :content="postTop.PostItemBody"
        :picList="postTop.AttachmentList|id2FilePath"
        :overLength="-1"
        picDisplayType="fullWidth"
      ></newsItem>
    </div>
    <div class="sorter">
      <van-tabs v-model="active" class="left-nav">
        <van-tab title="全部回复">
          <van-pull-refresh v-model="listState.all.refreshing" @refresh="onRefresh('all')">
            <van-list
              v-model="listState.all.loading"
              :finished="listState.all.finished"
              finished-text="没有更多了..."
              @load="onLoad('all')"
            >
              <div class="post-main-response">
                <postItem
                  v-for="(item,key) in listState.all.postBody"
                  :key="key"
                  :overLength="-1"
                  :userName="item.CreateName"
                  :subInfo="item.CreateDate  | datetime2String('recently')"
                  :content="item.PostItemBody"
                  :picList="item.AttachmentList | id2FilePath "
                  :isPostAuth="item.CreateName | isPostAuth"
                  picDisplayType="fullWidth"
                  @click.native="onItemClick(item)"
                  :showResponse="item | isShowResponse"
                  :more="item | isShowMore"
                  :moreNumber="item.ResponseCount"
                  @onGoodClick="handleGoodClick"
                  @onBadClick="handleBadClick"
                >
                  <div>
                    <div
                      class
                      v-for="(ritem,key) in item.ResponseList "
                      :key="key"
                      @click.stop="onMoreResponseClick(item)"
                    >
                      <span class="name">{{ritem.ResponseCreateName}}</span>
                      <!-- <van-tag plain v-if="item.CreateName | isPostAuth">楼主</van-tag> -->
                      <span>:</span>
                      <span>{{ritem.ResponseText}}</span>
                    </div>
                  </div>
                </postItem>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="只看楼主">
          <van-pull-refresh v-model="listState.only.refreshing" @refresh="onRefresh('only')">
            <van-list
              v-model="listState.only.loading"
              :finished="listState.only.finished"
              finished-text="没有更多了..."
              @load="onLoad('only')"
            >
              <div class="post-main-response">
                <postItem
                  v-for="(item,key) in listState.only.postBody"
                  :key="key"
                  :overLength="-1"
                  :userName="item.CreateName"
                  :subInfo="item.CreateDate  | datetime2String('recently')"
                  :content="item.PostItemBody"
                  :picList="item.AttachmentList | id2FilePath "
                  :isPostAuth="item.CreateName | isPostAuth"
                  picDisplayType="fullWidth"
                  @click.native="onItemClick(item)"
                  
                ></postItem>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <responsePanel
      uploadFile
      :showToolsbar="showToolsBar"
      :author="postTop.CreateName"
      :responseTarget="responseTarget"
      @onSendClick="handleSendClick"
    ></responsePanel>
  </div>
</template>
<script>
import newsItem from "../../components/panel/newsItem";
import postItem from "../../components/panel/postItem";
import sorter from "../../components/panel/sorter";
import userList from "../../components/panel/userList";
import postApis from "../../apis/post.js";
import util from "../../util/util.js";
import baseFileURL from "../../config/baseFileUrl";
import responsePanel from "../../components/panel/responsePanel";
import responseList from "../../components/panel/response";
let _this;
export default {
  name: "postDetail",
  components: {
    newsItem,
    postItem,
    sorter,
    userList,
    responsePanel,
    responseList
  },
  data() {
    return {
      title: "",
      postId: "",
      active: "1",
      value: 0,
      options: [
        { text: "热门排序", value: 0 },
        { text: "正序排序", value: 1 },
        { text: "倒序排序", value: 2 }
      ],
      postTop: {
        CreateName: "",
        PostTitle: "",
        PostItemBody: "",
        AttachmentList: []
      },
      responseTarget: {
        usercode: "",
        username: "",
        targetId: ""
      },
      reponsePanelHeader: {},
      showToolsBar: false,
      showUserList: false,
      scrollEventLock: false,
      showResponse: false,
      listState: {
        all: {
          firstLoad: true,
          loading: false,
          finished: false,
          refreshing: false,
          onLoadLock: false,
          postBody: [],
          rows: 15,
          page: -1
        },
        only: {
          firstLoad: true,
          loading: false,
          finished: false,
          refreshing: false,
          onLoadLock: false,
          postBody: [],
          rows: 15,
          page: -1
        }
      }
    };
  },
  beforeCreate() {
    _this = this;
  },
  created() {
    this.postId = this.$route.query.postId;
    // this.getPostBody();
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("scroll", _this.onScroll, true);
    });
  },
  methods: {
    onLoad: function(type) {
      if (!this.listState[type].onLoadLock) {
        this.listState[type].onLoadLock = true;
        let _this = this;
        this.listState[type].loading = true;
        this.listState[type].page++;

        if (type === "all") {
          this.getPostBody().then(
            res => {
              this.listState[type].onLoadLock = false;
              this.listState[type].loading = false;
            },
            err => {
              this.listState[type].onLoadLock = false;
              this.listState[type].loading = false;
              this.listState[type].finished = true;
            }
          );
        }
        if (type === "only") {
          this.getPostBodyOnlyAuth().then(
            res => {
              this.listState[type].onLoadLock = false;
              this.listState[type].loading = false;
            },
            err => {
              this.listState[type].onLoadLock = false;
              this.listState[type].loading = false;
              this.listState[type].finished = true;
            }
          );
        }
      }
    },
    onRefresh: function(type) {
      this.listState[type].page = 0;
      this.listState[type].refreshing = true;
      this.listState[type].finished = false;
      let length = this.listState[type].postBody.length;
      for (let i = 0; i < length; i++) {
        this.listState[type].postBody.shift();
      }
      if (type === "all") {
        this.getPostBody().then(res => {
          this.listState[type].refreshing = false;
        });
      }
      if (type === "only") {
        this.getPostBodyOnlyAuth().then(res => {
          this.listState[type].refreshing = false;
        });
      }
    },
    getPostBody: function() {
      return new Promise((resolve, reject) => {
        postApis
          .getPostBodyById(
            this.postId,
            this.listState.all.rows,
            this.listState.all.page
          )
          .then(
            res => {
              if (res) {
                if (res.postTop && res.postTop.length > 0) {
                  this.postTop = util.extend(
                    this.postTop,
                    res.postTop[0],
                    true
                  );
                } else if (this.firstLoad) {
                  this.firstLoad = false;
                  this.$toast.fail("该帖不存在或者已经删除");
                  setTimeout(() => {
                    this.$router.go(-1);
                  }, 1000 * 3);
                  reject();
                }
                if (res.postBody && res.postBody.length > 0) {
                  for (let i = 0; i < res.postBody.length; i++) {
                    this.listState.all.postBody.push(res.postBody[i]);
                  }
                  resolve();
                } else {
                  reject();
                }
                reject();
              } else {
                reject();
              }
            },
            err => {
              reject();
            }
          );
      });
    },
    getPostBodyOnlyAuth: function() {
      return new Promise((resolve, reject) => {
        postApis
          .getPostBodyOnlyAuth(
            this.postId,
            this.listState.only.rows,
            this.listState.only.page
          )
          .then(
            res => {
              if (res) {
                if (res.postTop && res.postTop.length > 0) {
                  this.postTop = util.extend(
                    this.postTop,
                    res.postTop[0],
                    true
                  );
                } else if (this.firstLoad) {
                  this.firstLoad = false;
                  this.$toast.fail("该帖不存在或者已经删除");
                  setTimeout(() => {
                    this.$router.go(-1);
                  }, 1000 * 3);
                  reject();
                }
                if (res.postBody && res.postBody.length > 0) {
                  for (let i = 0; i < res.postBody.length; i++) {
                    this.listState.only.postBody.push(res.postBody[i]);
                  }
                  resolve();
                } else {
                  reject();
                }
                reject();
              } else {
                reject();
              }
            },
            err => {
              reject();
            }
          );
      });
    },
    setPlaceHolder: function(usercode, username) {},
    handleLeftClick: function() {
      this.$router.go(-1);
    },
    handleResponseClick: function() {
      this.showToolsBar = true;
    },
    onItemClick: function(item) {
      this.showToolsBar = true;
      this.setResponseTarget(item.PostId, item.CreateName);
    },
    setResponseTarget: function(postId, usercode, username) {
      this.responseTarget = {
        usercode: usercode,
        username: username,
        targetId: postId
      };
    },
    onScroll: function() {
      if (!this.scrollEventLock) {
        this.showToolsBar = false;
        //this.responseTarget=
        this.setResponseTarget(this.postId, this.postTop.CreateName);
      }
    },
    handleSendClick: function(sendInfo) {
      postApis
        .addPostBody({
          PostItemBody: sendInfo.sendText,
          PostId: this.postId,
          ParentPostItemId: sendInfo.targetId,
          ImgId: sendInfo.sendImg
        })
        .then(res => {
          if (res.state === 1) {
            this.showToolsBar = false;
            // this.sendInfo.sendText = "";
            // this.sendInfo.sendImg = [];
            for (let item in this.listState) {
              this.listState[item].postBody.push(res.data[0]);
            }
          }
        });
    },
    handleEmotionClick: function() {
      this.showEmotion = true;
    },
    handleEmojiSelected: function(name) {
      this.sendText += name;
    },
    handleUserSelectorClick: function() {
      this.showUserList = true;
      this.scrollEventLock = true;
    },
    handleUserListBackClick: function() {
      this.scrollEventLock = false;
      this.showUserList = false;
    },
    handleUploadSuccess: function(idList) {
      this.sendInfo.sendImg = idList;
    },
    handleGoodClick:function(item){
      
    },
    handleBadClick:function(item){
      
    },
    onMoreResponseClick: function(item) {
      this.showResponse = true;
      this.reponsePanelHeader = item;
    }
  },
  filters: {
    time2String: function(value) {
      return util.dateFormatter("yyyy-MM-dd", value);
    },
    isPostAuth: function(value) {
      return _this.postTop.CreateName === value ? true : false;
    },
    // id2FilePath: function(value) {
    // 	if (util.isArray(value)) {
    // 		return value.map(item => {
    // 			return baseFileUrl + '/' + item
    // 		})
    // 	} else {
    // 		return baseFileUrl + '/' + item
    // 	}
    // }
    id2FilePath: function(value) {
      if (value) {
        let newArr = [];
        for (let i = 0; i < value.length; i++) {
          newArr.push(baseFileURL + "?id=" + value[i].AttachmentId);
        }
        return newArr;
      } else {
        return value;
      }
    },
    isShowMore: function(value) {
      if (
        value.ResponseList &&
        value.ResponseCount - value.ResponseList.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    showMoreNumber: function(value) {
      return value.totalResponse;
    },
    isShowResponse: function(value) {
      if (value.ResponseList && value.ResponseList.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.postDetail {
  margin-bottom: 45px;
  .post-master {
    margin-top: 1.5rem;
  }
  .sorter {
    box-shadow: 0 3px 1px 1px #f3f3f3;
    width: 100%;

    & >>> .van-tabs__line {
      z-index: 0;
    }
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

  .response {
    border-radius: 20px 20px 0 0;
    padding-top: 20px;
  }
}
// .sorter {
//     height:0.7rem;
//     background:#fff;
//     .left-nav>>>.van-tabs__nav{
//         height: 0.6rem!important;
//     }
//     .left-nav>>>.van-tab {
//         line-height: 0.6rem!important;
//     }
//     .left-nav>>>.van-tabs__nav{
//         padding:0;
//     }
//     .left-nav>>>.van-tabs__line{
//         bottom:0;
//         z-index: 0;
//     }
//     .left-nav>>>.van-tabs__wrap{
//         height:inherit!important;
//     }
// 	.right-sorter >>> .van-dropdown-menu__bar {
//         height:0.6rem;
// 		box-shadow: none !important;
// 	}
// }
</style>