<template>
  <div class="tools-bar-main" v-bind:class="fixed?'isFixed':''">
    <slot name="header"></slot>
    <div class="tools-bar">
      <div class="tools-header">
        <div class="tools-icon" @click="handleEmotionClick">
          <van-icon name="smile-o" size="0.9rem"></van-icon>
        </div>
        <div class="tools-icon" @click="handleUserSelectorClick">
          <van-icon name="friends-o" size="0.9rem"></van-icon>
        </div>
        <div class="tools-icon" @click="handleClubSelectorClick" v-if="club">
          <van-icon name="cluster-o" size="0.9rem"></van-icon>
        </div>
        <div class="tools-icon" @click="handleUserUploaderClick" v-if="uploadFile">
          <van-icon name="photo-o" size="0.9rem"></van-icon>
        </div>
      </div>
    </div>
    <div>
      <emojiSelector v-show="showPanel.showEmoji" @select="handleEmojiSelected"></emojiSelector>
      <!-- <slot name="footer" v-show="showEmoji.showEmoji"></slot> -->
      <div v-if="uploadFile" v-show="showPanel.showUploader">
        <van-uploader ref="uploader" v-model="img" multiple :after-read="handleUploadFile"></van-uploader>
      </div>
    </div>
  </div>
</template>
<script>
import emojiSelector from "../../components/emoji/lib/emoji";
import filesApis from "../../apis/files.js";
import util from "../../util/util.js";
export default {
  name: "postToolBar",
  components: {
    emojiSelector
  },
  props: {
    fixed: Boolean,
    uploadFile: Boolean,
    club: Boolean
  },
  data() {
    return {
      showUploader: false,
      showPanel: {
        showEmoji: false,
        showUploader: false
      },
      img: [],
      imageIdList: []
    };
  },
  methods: {
    handleEmotionClick() {
      this.panelToggle("showEmoji");
    },
    handleUserSelectorClick() {
      this.$emit("onUserSelectorClick");
    },
    handleClubSelectorClick: function() {
      this.$emit("onClubSelectorClick");
    },
    handleUserUploaderClick() {
      this.panelToggle("showUploader");
      if (this.showPanel["showUploader"]) {
        document.getElementsByClassName("van-uploader__input")[0].click();
      }
    },
    handleEmojiSelected(val) {
      this.$emit("onEmojiSelected", val);
    },
    panelToggle(tag) {
      if (this.showPanel[tag]) {
        this.showPanel[tag] = false;
      } else {
        let keys = Object.getOwnPropertyNames(this.showPanel);
        for (let item of keys) {
          this.showPanel[item] = false;
        }
        this.showPanel[tag] = true;
      }
    },
    handleUploadFile: function(files) {
      let filesArr = [];
      if (util.isArray(files)) {
        //判断是单文件还是多文件
        files.map(file => {
          filesArr.push(file.file);
        });
      } else {
        filesArr.push(files.file);
      }
      filesApis.uploadFile(filesArr).then(
        res => {
          res.data.data.map(item => {
            this.imageIdList.push(item.id);
          });
          this.$emit("onUploadSuccess", this.imageIdList);
        },
        err => {
          this.$toast.fail("文件上传失败");
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.tools-bar-main {
  bottom: 0;
  width: 100%;
  background: #fff;

  .tools-bar {
    .tools-header {
      display: flex;
      flex-wrap: wrap;
      padding: 0.1rem 0.7rem;
      .tools-icon {
        margin: 0 10px;
      }
    }
  }
}

.isFixed {
  position: fixed;
}
</style>