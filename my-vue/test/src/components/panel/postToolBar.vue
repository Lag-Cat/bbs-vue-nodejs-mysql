<template>
  <div class="tools-bar-main">
    <slot name="header"></slot>
    <div class="tools-bar">
      <div class="tools-header">
        <div class="tools-icon" @click="handleEmotionClick">
          <van-icon name="smile-o" size="0.9rem" ></van-icon>
        </div>
        <div class="tools-icon" @click="handleUserSelectorClick">
          <van-icon name="friends-o" size="0.9rem" ></van-icon>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: "postToolBar",
  methods: {
    handleEmotionClick() {
      this.$emit("onEmotionClick");
    },
    handleUserSelectorClick() {
      this.$emit("onUserSelectorClick");
    }
  }
};
</script>
<style lang="scss" scoped>
.tools-bar-main {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;

  .tools-bar {
    .tools-header {
      display:flex;
      flex-wrap:wrap;
      padding: 0.1rem 0.7rem;
      .tools-icon{
        margin:0 10px;
      }
    }
  }
}
</style>