const Response = require('../../dao/entity/Response.js')
const fileDao = require('../../dao/file/uploadAttachment.js')
const readFile = require('../../util/readFile.js')
const Attachment = require('../../dao/entity/Attachment.js')
module.exports = {
  upload: function (files) {
    return new Promise((resolve, reject) => {

      let result = {};
      //如果没有文件,返回失败
      if (!files[0]) {
        //返回错误信息
        reject(new Response({
          code: -1,
          msg: "上传失败，未接收到文件。"
        }))
      } else {
        //成功
        // fileDao.setAttachment(attachment).then(res=>{

        // })
        let task = [];
        for (let i = 0; i < files.length; i++) {
          task.push(readFile.readImage(files[i]));
        }

        Promise.all(task).then(res => { return this.updateFilesInfo(res) }).then(
          res => {
            resolve(new Response({
              code: 1,
              msg: "上传成功",
              data: {
                state: 1,
                data: res
              }
            }))
          }, err => {
            reject(err);
          })
      }
    })
  },
  updateFilesInfo: function (files) {
    return new Promise((resolve, reject) => {
      let task = [];
      for (let file of files) {
        let attachment = new Attachment({
          AttachmentName: file.filename,
          FileSize: file.size,
          FilePath: file.path,
          Property1: file.width,
          Property2: file.height,
        });

        task.push(fileDao.setAttachment(attachment))
      }
      Promise.all(task).then(res => {
        resolve(res);
      }, err => {

      })
    })
  }
}