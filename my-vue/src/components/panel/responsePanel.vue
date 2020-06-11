<template>
  <div class="responser">
    <div class="response">
      <van-row class="respone-i">
        <van-col :span="20">
          <van-field
            @click="handleResponseClick"
            v-model="sendInfo.sendText"
            :placeholder="placeholder"
          ></van-field>
        </van-col>
        <van-col :span="4" class="response-send">
          <div @click="handleSendClick">发送</div>
        </van-col>
      </van-row>
    </div>
    <div class="tools-bar-main" v-show="thisShowToolBar">
      <div class="tools-bar">
        <div class="tools-header">
          <div class="tools-icon" @click="handleEmotionClick">
            <van-icon name="smile-o" size="0.9rem"></van-icon>
          </div>
          <!-- <div class="tools-icon" @click="handleUserSelectorClick">
            <van-icon name="friends-o" size="0.9rem"></van-icon>
          </div>-->
          <div class="tools-icon" @click="handleUploaderClick" v-if="uploadFile">
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
  </div>
</template>
<script>
import emojiSelector from "../emoji/lib/emoji";
import util from "../../util/util.js";
import filesApis from "../../apis/files.js";
export default {
  name: "responsPanel",
  props: {
    uploadFile: Boolean,
    showToolsbar: Boolean,
    author: String,
    responseTarget: Object
  },
  components: {
    emojiSelector
  },
  data() {
    return {
      sendInfo: {
        targetUsercode:"",
        sendText: "",
        sendImg: [],
        targetId: "",
        meta: {}
      },
      img: [],
      placeholder: "请说说你的看法...",
      thisShowToolBar: false,
      showPanel: {
        showEmoji: false,
        showUploader: false
      }
    };
  },
  watch: {
    showToolsbar: function(val) {
      this.showToolsbar = val;
      this.thisShowToolBar = val;
    },
    responseTarget: function(val) {
      this.newTarget = val;
      this.sendInfo.targetId = val["targetId"];
      this.setPlaceHolder(val["usercode"], this.author, val["username"]);
      this.sendInfo.meta = {};
      if (val["meta"]) {
        this.sendInfo.meta=val["meta"]
      }
    }
  },
  methods: {
    handleSendClick: function() {
      this.$emit("onSendClick", this.sendInfo);
      this.clearSendInfo();
    },
    handleEmojiSelected: function(val) {
      this.sendInfo.sendText += val;
    },
    handleResponseClick: function() {
      this.thisShowToolBar = true;
    },
    handleEmotionClick: function() {
      this.panelToggle("showEmoji");
    },
    handleUserSelectorClick: function() {},
    handleUploaderClick: function() {
      this.panelToggle("showUploader");
      if (this.showPanel["showUploader"]) {
        document.getElementsByClassName("van-uploader__input")[0].click();
      }
    },
    panelToggle: function(tag) {
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
            this.sendInfo.sendImg.push(item.id);
          });
        },
        err => {
          this.$toast.fail("文件上传失败");
        }
      );
    },
    setPlaceHolder(usercode, author, username) {
      //如果回复人不是楼主
      if (usercode !== author) {
        this.placeholder = "回复  " + (username ? username : usercode) + "： ";
        this.setResponseTaget(usercode);
      } else {
        this.setResponseTaget(author);
        this.placeholder = "说说你的看法...";
      }
    },
    setResponseTaget: function(usercode) {
      this.sendInfo.targetUsercode = usercode;
    },
    clearSendInfo: function() {
      this.sendInfo = {
        targetUsercode:"",
        sendText: "",
        sendImg: [],
        targetId: "",
        meta: {}
      };
      let imgLen=this.img.length;
      for(var i=0;i<imgLen;i++){
        this.img.pop();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.responser {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  .response {
    width: 100%;
    background: #fff;
    .respone-i {
      border-top: 1px solid #e9e9e9;
    }

    .response-send {
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.4rem;
      color: #9e9e9e;
    }

    .tools-bar {
      .tools-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.1rem 0.7rem;
      }
    }
  }

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
}

.isFixed {
  position: fixed;
}
</style>