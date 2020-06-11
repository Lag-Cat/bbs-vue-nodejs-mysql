<template>
  <commFrame>
    <floatNav :textArr="['发帖','刷新']" @onItemClick="handleItemClick"></floatNav>
    <div class="club-info" @click="handleClubItemClick(item)">
      <div class="club-icon">
        <van-image :src="club.IconId | filePath" height="80px" width="80px"></van-image>
      </div>
      <div class="club-content">
        <div class="content-title">{{club.Name}}</div>
      </div>
      <div class="club-opera">
        <van-button v-if="club.isFocus" size="small" plain round color="#ffa500" >已关注</van-button>
        <van-button v-else size="small" plain round color="#ffa500" @click.stop="handleFocusClick(club.Id)">关注</van-button>
      </div>
      <div class="cb"></div>
    </div>
    <div class="splice-block"></div>
    <div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了..." @load="onLoad">
          <newsItem
            v-for="(item,key) in list"
            :key="key"
            :userName="item.CreateName"
            :subInfo="item.CreateDate | datetime2String('recently')"
            :content="item.PostTitle"
            :picList="item.AttachmentList | filePathArr('AttachmentId')"
            :overLength="100"
            @click.native="onItemClick(item)"
          ></newsItem>
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
        </van-list>
      </van-pull-refresh>
    </div>
  </commFrame>
</template>
<script>
import newsItem from "../../components/panel/newsItem";
import bbsApis from "../../apis/post.js";
import clubApis from "../../apis/club.js";
import floatNav from "../../components/nav/floatNav";
export default {
  name: "home",
  components: { newsItem, floatNav },
  data() {
    return {
      rows: 10,
      page: -1,
      list: [],
      club: {
        Id: "",
        IconId: "",
        Name: "",
        isFocus:false
      },
      loading: false,
      finished: false,
      refreshing: false,
      skeletonLoading: false,
      onLoadLock: false
    };
  },
  created() {
    //this.$store.commit('',this.$route.name,true);
    this.club.Id = this.$route.query.clubId;
    this.getClub();
  },
  mounted() {},
  methods: {
    onLoad() {
      if (!this.onLoadLock) {
        this.onLoadLock = true;
        let _this = this;
        this.skeletonLoading = true;
        this.loading = true;
        this.page++;

        this.getNewsList().then(
          res => {
            this.onLoadLock = false;
            this.loading = false;
            this.skeletonLoading = false;
          },
          err => {
            this.onLoadLock = false;
            this.loading = false;
            this.skeletonLoading = false;
            this.finished = true;
          }
        );
      }
    },
    onRefresh() {
      this.page = 0;
      this.refreshing = true;
      this.finished = false;
      let length = this.list.length;
      for (let i = 0; i < length; i++) {
        this.list.shift();
      }
      this.getNewsList().then(res => {
        this.refreshing = false;
      });
    },
    getNewsList() {
      let _this = this;
      return new Promise((resolve, reject) => {
        bbsApis.getPostList(this.club.Id, this.rows, this.page).then(res => {
          if (res.length > 0) {
            for (let item of res) {
              _this.list.push(item);
            }
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    onItemClick(item) {
      this.$router.push({
        name: "postDetail",
        query: {
          postId: item.PostId
        }
      });
    },
    getClub: function() {
      clubApis.getClubById(this.club.Id).then(
        res => {
          this.club = {
            Id: res[0].Id,
            IconId: res[0].IconId,
            Name: res[0].Name,
            isFocus:res[0].isFocus
          };
        },
        err => {
          this.$toast.fail("不存在该部落或该部落已经被封闭。");
        }
      );
    },
    handleItemClick: function(name) {
      if (name === "发帖") {
        this.$router.push({
          name:"addPostHead",
          query:{
            clubId:this.club.Id,
            clubName:this.club.Name
          }
        })
      }
      if(name==="刷新"){
        this.$router.go(0);
      }
    },
    handleFocusClick:function(clubId){
      clubApis.focusClub(clubId).then(res=>{
        this.$toast.success("关注成功");
        this.club.isFocus=1;
      },err=>{
        this.$toast.fail("关注失败");
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.club-info {
  position: relative;
  border-bottom: 1px solid #e9e9e9;
  padding: 10px 5px;
  .club-icon {
    float: left;
    >>> img {
      border-radius: 20px;
    }
  }

  .club-content {
    float: left;
    .content-title {
      font-size: 15px;
      line-height: 25px;
    }
  }

  .club-opera {
    position: absolute;
    right: 10px;
    top: 20px;
  }
}
</style>