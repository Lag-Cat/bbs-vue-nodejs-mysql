<template>
  <div>
    <van-nav-bar
      left-text="返回"
      :title="title"
      left-arrow
      @click-left="$router.go(-1)"
      :fixed="true"
      
    ></van-nav-bar>
    <div class="main-slot">
    <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "commframe",
  props: {
    title: String
  }
};
</script>
<style lang="scss" scoped>
.main-slot{
  margin-top:50px;
}
</style>