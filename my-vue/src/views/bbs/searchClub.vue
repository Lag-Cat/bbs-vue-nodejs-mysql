<template>
  <commFrame>
    <van-search v-model="searchText" placeholder="搜搜你感兴趣的部落..." @keydown="handleSearchKeydown"></van-search>
    <div>
      <div class="title">
        <span>搜索结果:</span>
      </div>
      <div class="list">
        <div class="club-info" v-for="(item,key) in list" @click="handleClubItemClick(item)">
          <div class="club-icon">
            <van-image :src="item.IconId | filePath" height="80px" width="80px"></van-image>
          </div>
          <div class="club-content">
            <div class="content-title">{{item.Name}}</div>
            <div class="content-subtext">关注:<span>{{item.focusCount}}</span>人</div>
          </div>
          <div class="club-opera">
            <van-button v-if="item.isFocus | num2Bool" size="small" plain round color="#ffa500" >已关注</van-button>
            <van-button v-else size="small" plain round color="#ffa500" @click.stop="handleFocusClick(item.Id)">关注</van-button>
          </div>
          <div class="cb"></div>
        </div>
      </div>
    </div>
  </commFrame>
</template>
<script>
import clubApis from "../../apis/club.js";
import util from "../../util/util.js";
import picButton from "../../components/button/picButton";
export default {
  name: "searchClub",
  components: {
    picButton
  },
  data() {
    return {
      searchText: "",
      list: []
    };
  },
  created() {
    this.searchText = this.$route.query.searchText;
    if (this.searchText) {
      this.searchClub();
    }
  },
  methods: {
    handleClubItemClick:function(item){
      this.$router.push({
        name:"postList",
        query:{
          clubId:item.Id
        }
      })
    },
    handleSearchKeydown: function(e) {
      if (e.keyCode === 13 && this.searchText) {
        this.searchClub();
      }
    },
    handleFocusClick:function(clubId){
      clubApis.focusClub(clubId).then(res=>{
        this.$toast.success("关注成功");
        setTimeout(() => {
          this.$router.push({
            name:"postList",
            query:{
              clubId:clubId
            }
          })
        }, 500);
      },err=>{
        this.$toast.fail("关注失败");
      })
    },
    searchClub: function() {
      this.clearList();
      clubApis.searchClub(this.searchText).then(res => {
        if (util.hasArray(res)) {
          res.map(item => {
            this.list.push(item);
          });
        }
      });
    },
    clearList: function() {
      let length = this.list.length;
      for (let i = 0; i < length; i++) {
        this.list.pop();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.club-info {
  position: relative;
  border-bottom:1px solid #e9e9e9;
  padding:10px 5px;
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

    .content-subtext {
      font-size: 13px;
      color: #7a7a7a;
    }
  }

  .club-opera {
    position: absolute;
    right: 10px;
    top: 20px;
  }
}
</style>