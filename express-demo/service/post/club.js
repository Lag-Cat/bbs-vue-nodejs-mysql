const clubDao = require('../../dao/post/club')
const util = require('../../util/util.js')
const Response = require('../../dao/entity/Response.js')
const token = require('../../util/token.js')
module.exports = {
  getClubList:(clubId,name,tag,type,userToken)=>{
    let usercode="";
    if(userToken)
      usercode=token.decrypt(userToken).id;
    return new Promise((resolve,reject)=>{
      clubDao.getClubList(clubId,name,tag,type,usercode).then(res=>{
        resolve(new Response({
          data:res
        }))
      },err=>{
        reject(new Response({
          code:-1
        }));
      })
    });
  },
  getFocusClubList:(userToken)=>{
    return new Promise((resolve,reject)=>{
      let usercode=token.decrypt(userToken).id;
      clubDao.getFocusClubList(usercode).then(res=>{
        resolve(new Response({
          data:res
        }))
      },err=>{
        reject(new Response({
          code:-1
        }));
      })
    });
  },
  searchClubList:(clubName,userToken)=>{
    let usercode="";
    if(userToken)
      usercode=token.decrypt(userToken).id;
    return new Promise((resolve,reject)=>{
      clubDao.searchClubList(clubName,usercode).then(res=>{
        resolve(new Response({
          data:res
        }))
      },err=>{
        reject(new Response({
          code:-1
        }));
      })
    });
  },
  focusClub: (club,userToken) => {
    let userCode=token.decrypt(userToken).id;
    return new Promise((resolve,reject)=>{
      clubDao.focusClub(club.clubId,userCode).then(res=>{
        resolve(
          new Response({
            data:res
          })
        )
      },err=>{
        reject(
          new Response({
            code:-1,
            msg:"已关注该部落。"
          })
        )
      })
    })
  },
  cancelFocusClub: (club,userToken) => {
    let userCode=token.decrypt(userToken).id;
    return new Promise((resolve,reject)=>{
      clubDao.cancelFocusClub(club.clubId,userCode).then(res=>{
        resolve(
          new response({
            data:res
          })
        )
      },
      err=>{
        reject(new Response({
          code:-1,
          msg:"未知错误。"
        }))
      })
    })
  }
}