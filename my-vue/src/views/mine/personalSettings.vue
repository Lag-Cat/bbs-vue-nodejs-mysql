<template>
  <commFrame title="个人资料">
    <section class="upload">
      <!-- <van-image :src="userInfo.photoId |filePath" round width="100px" height="100px"></van-image> -->
      <van-uploader
        v-model="photoList"
        class="photo-uploader"
        :max-count="1"
        :after-read="handleUploadFile"
      ></van-uploader>
    </section>
    <section>
      <van-field v-model="userInfo.userName" label="用户名"></van-field>
      <van-cell title="性别" clickable>
        <template #right-icon>
          <van-radio-group direction="horizontal" v-model="userInfo.sex">
            <van-radio name>不填</van-radio>
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
      <van-field v-model="userInfo.phone" label="电话"></van-field>
      <van-field v-model="userInfo.email" label="邮箱"></van-field>
      <van-field v-model="userInfo.address" label="地址"></van-field>
    </section>
    <van-button class="btn-success" size="large" @click="setUserInfo">保存</van-button>
  </commFrame>
</template>
<script>
import userApis from "../../apis/users.js";
import util from "../../util/util.js";
import uploadApis from "../../apis/files.js";
export default {
  name: "personalSettings",
  data() {
    return {
      photoList: [],
      userInfo: {
        photo: "",
        userName: "",
        sex: "",
        phone: "",
        address: "",
        email: ""
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo: function() {
      userApis.getUserAlterInfo().then(res => {
        this.userInfo = util.extend(res[0], this.userInfo, false);
        this.userInfo.photo = res[0].photo;
        if (res[0].photo) {
          this.photoList.push({
            url: util.filePath(res[0].photo),
            isImage: true
          });
        }
      });
    },
    setUserInfo: function() {
      userApis.alterUserInfo(this.userInfo).then(res => {
        this.$toast.success("保存成功");
      });
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
      uploadApis.uploadFile(filesArr).then(
        res => {
          res.data.data.map(item => {
            this.userInfo.photo = item.id;
          });
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
.upload {
  position: relative;
  height: 150px;
  .photo-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>