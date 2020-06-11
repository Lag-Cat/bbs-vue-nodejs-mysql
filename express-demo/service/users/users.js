const Response = require('../../dao/entity/Response.js')
const UserInfo = require('../../dao/entity/UserInfo.js')
const usersDao = require('../../dao/users/users.js')
const Mynote = require('../../dao/entity/Mynote.js')
const cJwt = require('../../util/token.js')
const util = require('../../util/util.js')
module.exports = {
    setUserNote: (note, userToken) => {
        return new Promise((resolve, reject) => {
            let mynoteEntity = util.mapping(new Mynote({}), note, true);
            mynoteEntity.UserCode = cJwt.decrypt(userToken).id;
            usersDao.setUserNote(mynoteEntity).then(res => {
                resolve(
                    new Response({
                        data: {
                            state: 1,
                            data: res[res.length - 1]
                        }
                    })
                )
            })
        })
    },
    getUserNote: (userToken) => {
        return new Promise((resolve, reject) => {
            usersDao.getUserNote(cJwt.decrypt(userToken).id).then(res => {
                resolve(
                    new Response({
                        data: {
                            state: 1,
                            data: res
                        }
                    })
                )
            })
        })
    },
    getUserCount: (userToken) => {
        let userCode = cJwt.decrypt(userToken).id;
        return new Promise((resolve, reject) => {
            usersDao.getUserCount(userCode).then(res => {
                resolve(new Response({
                    data: res
                }))
            }, err => {
                reject(new Response({
                    code: -1
                }))
            })
        })
    },
    getUserAlterInfo: (userToken) => {
        let userCode = cJwt.decrypt(userToken).id;
        return new Promise((resolve, reject) => {
            usersDao.getUserAlterInfo(userCode).then(res => {
                resolve(new Response({
                    data: res
                }))
            }, err => {
                reject(new Response({
                    code: -1
                }))
            })
        })
    },
    alterUserInfo: (userInfo, userToken) => {
        return new Promise((resolve, reject) => {
            let userInfoEntity = util.mapping(new UserInfo({}), userInfo, true);
            userInfoEntity.UserCode = cJwt.decrypt(userToken).id;
            usersDao.alterUserInfo(userInfoEntity).then(res => {
                resolve(new Response({
                    data: {
                        data: "修改成功"
                    }
                }))
            }, err => {
                reject(new Response({
                    code: -1,
                    msg: "修改失败"
                }))
            })
        })
    }
}