<template>
  <div>
    <postItem
      :overLength="-1"
      :userName="header.CreateName"
      :subInfo="header.CreateDate | datetime2String('recently')"
      :content="header.PostItemBody"
      :isPostAuth="true"
      :picList="header.AttachmentList | id2FilePath "
      picDisplayType="fullWidth"
      hideBorderBottom
    ></postItem>
    <div class="splice-block"></div>
    <div>
      <postItem
        :overLength="-1"
        :userName="item.CreateName"
        :subInfo="item.CreateDate | datetime2String('recently')"
        :content="item.ResponseText | responseFilter(item)"
        :isPostAuth="true"
        @click.native="handleItemClick(null,item.CreateName,item.UserName,'response')"
        v-for="(item,key) in responseList "
        :key="key"
      ></postItem>
      <commTextPanel content="::worried;::flushsd;::flushed ::frowning ::neutral_face"></commTextPanel>
    </div>
    <div class="responsePanel-block"></div>
    <div>
      <responsePanel
        :showToolsbar="showToolsBar"
        :author="author"
        :responseTarget="responseTarget"
        @onSendClick="handleSendClick"
      ></responsePanel>
    </div>
  </div>
</template>
<script>
import postItem from "./postItem";
import responsePanel from "./responsePanel";
import commTextPanel from "./commTextPanel";
import postApis from "../../apis/post.js";
export default {
  name: "response",
  components: {
    postItem,
    responsePanel,
    commTextPanel
  },
  props: {
    header: Object,
    responses: Array
  },
  data() {
    return {
      author: "",
      responseTarget: {},
      responseList: [],
      rows: 15,
      page: 0,
      showToolsBar: false
    };
  },
  created() {
    this.getResponse();
  },
  methods: {
    handleItemClick: function(id, usercode, username, type) {
      this.showToolsBar = true;
      this.setResponseTarget(id, usercode, username, type);
    },
    handleSendClick: function(sendInfo) {
      postApis.addPostResponse({
        PostId: this.header.PostId,
        ResponseText: sendInfo.sendText,
        To: sendInfo.targetUsercode
      });
    },
    setResponseTarget: function(id, usercode, username, type) {
      //id=帖子id
      this.responseTarget = {
        usercode: usercode,
        username: username,
        targetId: id,
        meta: {
          type: type
        }
      };
    },
    getResponse: function() {
      postApis
        .getPostResponse(this.header.PostId, this.rows, this.page)
        .then(res => {
          res.map(item => {
            this.responseList.push(item);
          });
        });
    }
  },
  filters: {
    responseFilter: function(val, item) {
      if (item.To) {
        return "回复 " + item.To + "：" + val;
      } else {
        return val;
      }
    },
    
  }
};
</script>
<style lang="scss" scoped>
.responsePanel-block {
  height: 50px;
}
</style>