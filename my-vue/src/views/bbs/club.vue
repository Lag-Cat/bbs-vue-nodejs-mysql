<template>
  <div>
    <van-search placeholder="搜搜你感兴趣的部落..." v-model="searchText" @keydown="handleSearchKeydown"></van-search>
    <section>
      <van-cell title="常逛的部落"></van-cell>
      <div class="hrozontal-panel"></div>
    </section>

    <section>
      <van-cell title="我的关注"></van-cell>
      <div>
        <van-row>
          <van-col span="12" v-for="(item,key) in focusClub" :key="key">
            <labelButton
              :src="item.IconId | filePath"
              :label="item.Name"
              @click.native="handleItemClick(item)"
            ></labelButton>
          </van-col>
        </van-row>
      </div>
    </section>
  </div>
</template>
<script>
import picButton from "../../components/button/picButton";
import labelButton from "../../components/button/labelButton";
import clubApis from "../../apis/club.js";
export default {
  name: "",
  components: {
    picButton,
    labelButton
  },
  data() {
    return {
      searchText: "",
      focusClub: [],
      isLogined: true
    };
  },
  created() {
    this.getMyClub();
  },
  methods: {
    handleItemClick: function(item) {
      this.$router.push({
        name: "postList",
        query: {
          clubId: item.ClubId
        }
      });
    },
    handleSearchKeydown: function(e) {
      if (e.keyCode == "13") {
        this.search();
      }
    },
    search: function() {
      //todo....
      //this.searchText
      this.$router.push({
        name: "searchClub",
        query: {
          searchText: this.searchText
        }
      });
    },
    getMyClub: function() {
      clubApis.getFocusClub().then(
        res => {
          if (res && res.length > 0) {
            res.map(item => {
              this.focusClub.push(item);
            });

          }
        },
        err => {}
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.hrozontal-panel {
  overflow-x: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
}
</style>