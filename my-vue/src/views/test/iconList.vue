<template>
  <div>
    <div>
      <input type="file" @change="getFile" />
      <button @click="handleClick">test</button>
    </div>
    <div class="iconList">
      <div class="iconItem" v-for="(item,key) in iconList">
        <div class="tc">
          <van-icon :name="item" :key="key" :size="'1rem'"></van-icon>
        </div>
        <div class="tc">
          <span>{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "iconList",
  data() {
    return {
      path: "",
      iconList: [],
      test: ""
    };
  },
  methods: {
    getFile(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      let _this = this;
      reader.onload = function() {
        _this.test += this.result;
        let match = /.van-icon-[\s\S]*?:/g;
        let matched = _this.test.match(match);
        for (let icon of matched) {
          _this.iconList.push(icon.replace(".van-icon-", "").replace(":", ""));
        }
      };
      reader.readAsText(file);
    },
    handleClick() {
    }
  }
};
</script>

<style lang="scss" scoped>
.iconList {
  display: flex;
  flex-wrap: wrap;

  .iconItem {
    margin:20px;
    .tc {
      text-align: center;
    }
  }
}
</style>