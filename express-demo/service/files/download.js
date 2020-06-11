const Response = require('../../dao/entity/Response.js')
const fileDao = require('../../dao/file/uploadAttachment.js')
const readFile = require('../../util/readFile.js')
const Attachment = require('../../dao/entity/Attachment.js')
module.exports = {
    getFilePath: function (id) {
        return new Promise((resolve, reject) => {
            fileDao.getAttachmentPath(id).then(res => {
                if (res.length > 0)
                    resolve(res[0].FilePath);
                else
                    reject();
            })
        })
    }
}