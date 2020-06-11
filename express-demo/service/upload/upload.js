const Response= require('../../dao/entity/Response.js')
const fileDao =require('../../dao/file/uploadAttachment.js')
module.exports = {
  upload: function (files) {
    return new Promise((resolve, reject) => {
      
      let result = {};
      //如果没有文件,返回失败
      if (!files[0]) {
        //返回错误信息
        reject(new Response({
          code:-1,
          msg:"上传失败，未接收到文件。"
        }))
      } else {
        //成功
        // fileDao.setAttachment(attachment).then(res=>{
          
        // })
        resolve(new Response({
          code:1,
          msg:"上传成功",
          data:{
            state:1,
            data:"123123131"
          }
        }))
      }
    })
  }
}