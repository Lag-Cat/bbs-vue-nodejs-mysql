let users = require('../../dao/users/users.js')
let md5 = require('md5-node')
let util = require('../../util/util.js')
let cJwt = require('../../util/token.js')
const dateTime = require('../../util/DateTime.js')
let Response = require('../../dao/entity/Response.js')
let UserInfo = require('../../dao/entity/UserInfo.js')
module.exports = {
  userLogin: (user) => {
    return new Promise(function (resolve, reject) {
      users.getLogin(user).then(
        result => {
          if (result && result.length > 0) {
            let res = result[0];
            if (user.usercode == res.usercode
              && md5(user.password) == res.md5password) {
              const token = cJwt.encrypt({ id: user.usercode }, '15d');
              resolve(
                {
                  state: true,
                  usercode: res.usercode,
                  token: token,
                  result: new Response({
                    msg: "登录成功",
                    data:{
                      state:1,
                      token: token,
                      userCode:res.usercode,
                      userName:res.userName
                    }
                  })
                });
            } else {
              resolve({
                state: true,
                usercode: "",
                token: "",
                result: new Response({
                  code: -1,
                  msg: "密码错误",
                  data:{
                    state:-1
                  }
                })
              });
            }
          } else {
            resolve({
              state: true,
              usercode: "",
              token: "",
              result: new Response({
                code: -1,
                msg: "不存在当前用户",
                data:{
                  state:-1
                }
              })
            });
          }
        }, err => { }
      )
    })
  },
  getUserInfo: (user) => {
    
  },
  getUserTokenInfo: (user) => {
    return new Response({
      data: {
        token: cJwt.decrypt(user.token)
      }
    })
  },
  register: (user) => {
    return new Promise((resolve, reject) => {
      let userEntity = util.mapping(new UserInfo({}), user, true);
      userEntity.CreateTime = new Date();
      userEntity.UserCode = userEntity.UserCode ? userEntity.UserCode : "";//md5(userEntity.UserCode + userEntity.UserName).substring(0, 30);
      userEntity.Md5Passord = md5(user.password);
      //userEntity.OpenId = userEntity.OpenId ? userEntity.OpenId : md5(userEntity.UserCode + userEntity.UserName);
      userEntity.Inactived = 0;
      users.register(userEntity).then(res => {
        let data = res[0];
        if (data.length > 0 && data[0].STATUS == "1")
          resolve(new Response({
            msg: "注册成功",
          }))
        else if (data.length > 0 && data[0].STATUS == "-1") {
          reject(new Response({
            code:-1,
            msg: data[0].ERR_MSG,
          }))
        } else {
          reject(new Response({
            code: -1,
            msg: "未知名错误"
          }))
        }
      },
        err => {
          reject(new Response({
            code: -1,
            msg: "注册失败"
          }))
        })
    })

  }
}