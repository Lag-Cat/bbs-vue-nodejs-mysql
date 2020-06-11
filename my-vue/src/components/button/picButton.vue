<template>
  <div class="picButton">
    <div>
      <van-image
        :src="src"
        :height="height?height:'80px'"
        :width="width?width:'80px'"
        fit="fill"
      ></van-image>
    </div>
    <div>
      <span>{{title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "picButton",
  props: {
		src:String,
		title:String,
    height: String,
    width: String
  }
};
</script>
<style lang="scss" scoped>
.picButton {
  display: inline-block;
  text-align: center;
  margin: 5px;
}
.onRight {
  float: left;
  vertical-align: middle;
}
.fl {
  float: left;
}
</style>