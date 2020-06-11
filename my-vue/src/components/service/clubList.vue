<template>
  <div class="userList">
    <van-nav-bar left-text="返回" left-arrow @click-left="handleLeftClick" :fixed="true"></van-nav-bar>
    <van-list class="userlist-list" @load="onLoad">
      <div v-for="(item,key) in list" :key="key">
        <van-cell >
          <van-row @click="handleItemClick(item)">
            <van-col :span="6">
              <van-image round :src="item.IconId | filePath" height="40px" width="40px"></van-image>
            </van-col>
            <van-col :span="12">{{item.Name}}</van-col>
          </van-row>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>
<script>
import clubApis from "../../apis/club.js";
export default {
  name: "userList",
  props: {
    isPage: Boolean
  },
  data() {
    return {
      list: [],
      loading: true,
      finished: false,
      testImage: require("../../assets/logo.png")
    };
  },
  methods: {
    onLoad: function() {
      clubApis.getFocusClub().then(res => {
        if (res) {
          res.map(item => {
            this.list.push(item);
          });
        }
      });
    },
    handleLeftClick: function() {
      if (this.isPage) this.$router.go(-1);
      else this.$emit("onBackClick");
    },
    handleItemClick:function(item){
      this.$emit('onItemClick',{clubId:item.ClubId,clubName:item.Name})
    }
  }
};
</script>
<style lang="scss" scoped>
.userList {
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 1000;
  position: relative;
  overflow: hidden;
  .userlist-list {
    position: absolute;
    width: 100%;
    top: 50px;
    left: 0;
    bottom: 0px;
    overflow: scroll;
    padding: 10px 0 0 0;
  }
}
</style>