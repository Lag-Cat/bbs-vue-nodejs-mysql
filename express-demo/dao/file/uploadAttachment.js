let mysql = require('mysql')
let $conf = require('../../config/db/mysql.js')
let $util = require('../../util/util.js')

var conf = $util.extend({}, $conf.mysql);
conf = $util.extend(conf, { database: 'bbs' });
var pool = mysql.createPool(conf)//创建连接池

module.exports = {
  setAttachment: (attachment) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = 'INSERT INTO attachment VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,0,sysdate(),?,?,?,?,?) ;'
          + ' SELECT last_insert_id() as Id;'
        connection.query(sql, [
          attachment.AttachmentName,
          attachment.FileSize,
          attachment.FileHost,
          attachment.FilePath,
          attachment.CompressFileId,
          attachment.Property1,
          attachment.Property2,
          attachment.Property3,
          attachment.Property4,
          attachment.Property5,
          attachment.Property6,
          attachment.Memo,
          attachment.IsDelete,
          attachment.CreateName,
          attachment.Site,
          attachment.Host,
          attachment.PlatForm,
          attachment.HostArea,
        ], (err, result) => {
          connection.release();
          if (err) reject(err);
          else resolve({
            id: result[1][0]['Id']
          });
        })
      })
    })
  },
  getAttachmentPath: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = 'SELECT FilePath FROM ATTACHMENT WHERE AttachmentId=? AND IFNULL(isdelete , 0)=0 '
        connection.query(sql, [
          id
        ], (err, res) => {
          connection.release();
          if (err) reject(err);
          else resolve(res)
        })
      })
    })
  }
}