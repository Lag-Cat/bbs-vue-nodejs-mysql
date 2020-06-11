<template>
  <div class="login">
    <van-image class="logo" :src="require('../../assets/logo.png')" height="100px" width="100px"></van-image>
    <van-row>
      <van-col offset="2" :span="20">
        <van-field v-model="userCode" class="cust-van-field" placeholder="用户名"></van-field>
      </van-col>
    </van-row>
    <van-row>
      <van-col offset="2" :span="20">
        <van-field v-model="passWord" class="cust-van-field" placeholder="密  码"></van-field>
      </van-col>
    </van-row>
    <van-row>
      <van-col offset="2" :span="20">
        <van-button class="login-button" size="large" @click="userLogin">登录</van-button>
      </van-col>
    </van-row>
    <van-row>
      <van-col offset="2" :span="20">
        <van-button size="large">注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import loginApi from "../../apis/login.js";
export default {
  name: "login",
  data() {
    return {
      userCode: "",
      passWord: ""
    };
  },
  methods: {
    userLogin: function() {
      loginApi.userLogin(this.userCode, this.passWord).then(res=>{
				if(res.state==1){
          this.$store.commit('setToken',res.token)
          this.$router.push({"name":"index"})
				}
			})
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  top: 20%;
  .logo {
    margin: 0 auto;
    position: static;
    display: block;
    padding-bottom: 20px;
  }

  .cust-van-field {
    border: 1px solid #e9e9e9;
    margin: 5px 0;
  }

  .login-button {
    background: #00ad00;
    color: #fff;
  }
}
</style>