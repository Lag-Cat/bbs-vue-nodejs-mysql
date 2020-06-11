<template>
  <div>
    <div class="label-nav-image-block">
      <van-image
        class="label-nav-image"
        :src="src"
        height="100%"
        width="100%"
      ></van-image>
    </div>
    <div class="label-nav-text">
      <span>{{label}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:"labelButton",
  props:{
    src:String,
    label:String
  },
  data(){
    return {

    }
  },
}
</script>
<style lang="scss" scoped>
.label-nav-image-block {
  position: relative;
  width: 20%;
  height: 0;
  padding-top: 20%;
  vertical-align: middle;
  display: inline-block;
  .label-nav-image {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.label-nav-text {
  vertical-align: middle;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  width:70%;
  display: inline-block;
  white-space: nowrap;
}
</style>