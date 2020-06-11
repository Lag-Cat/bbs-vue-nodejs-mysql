let mysql = require('mysql')
let $conf = require('../../config/db/mysql.js')
let $util = require('../../util/util.js')

var conf = $util.extend({}, $conf.mysql);
conf = $util.extend(conf, { database: 'bbs' });
var pool = mysql.createPool(conf)//创建连接池

module.exports = {
  getPostList: (post, rows, page) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = " select a.*,c.AttachmentId,c.AttachmentName from "
          + " (select body.PostId,body.PostTopBodyId,PostType,Tag,BBSAreaid,BBSAreaname,PostTitle,PostTopBody,PostTopBodyAttachment,LastResponseDate,LastResponseName,ResponseCount,RowCount,CreateName,CreateDate "
          + " from postheader as body where ifnull(body.IsDelete,0)=0 "
          + " and (( ? is not null and PostId=? ) "
          + " or ( ? is not null and Tag=? ) "
          + " or ( ? is not null and PostType=? ) "
          + " or ( ? is not null and BBSAreaId=?)) "
          + " or ( ? is null and ? is null and ? is null and ? is null) "
          + " order by CreateDate desc "
          + " limit ?,?) as a "
          + " left join postattachment as b on a.PostTopBodyId=b.postid "
          + " left join attachment as c on b.attachmentid=c.attachmentid ";
        connection.query(sql, [
          post.PostId,
          post.PostId,
          post.Tag,
          post.Tag,
          post.PostType,
          post.PostType,
          post.BBSAreaId,
          post.BBSAreaId,
          post.PostId,
          post.Tag,
          post.PostType,
          post.BBSAreaId,
          rows * page,
          parseInt(rows)
        ], (err, result) => {
          connection.release();
          resolve(result);
        })
      })
    })
  },
  getPostBodyList: (postId, rows, page) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = " select a.*,c.AttachmentId,d.ResponseText,d.ResponseId,d.CreateName as ResponseCreateName,d.CreateDate as ResponseCreateDate,d.To,e.ResponseCount from ( "
          + " select PostId,RowNumber,PostItemBody,PostItemAttachment,  "
          + "   CreateDate,CreateName,ResponseDate,ResponseName,ParentPostItemId,Good,Bad,IsPostTop  "
          + " from postitem  "
          + " where ifnull(isDelete,'0')='0' and PostHeaderId=? "
          + " limit ?,?) as a "
          + " left join postattachment b on a.PostId=b.PostId "
          + " left join attachment c on b.AttachmentId=c.AttachmentId "
          + " left join postresponse d on a.postid=d.postid and d.responseid in "
          + " (select responseid from  ( "
          + " select responseid from postresponse r where a.postid=r.postid order by postid,responseid asc limit 3) "
          + " as tmp)"
          + " left join (select count(1) as ResponseCount,postid from postresponse group by postid) e on a.postid=e.postid; ";
        connection.query(sql, [
          postId,
          rows * page,
          parseInt(rows)
        ], (err, result) => {
          connection.release();
          resolve(result);
        })
      })
    })
  },
  getPostBodyListOnlyAuth: (postId, rows, page) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = " select a.*,c.AttachmentId from ( "
          + " select PostId,RowNumber,PostItemBody,PostItemAttachment,  "
          + "   CreateDate,CreateName,ResponseDate,ResponseName,ParentPostItemId,Good,Bad,IsPostTop  "
          + " from postitem  "
          + " where ifnull(isDelete,'0')='0' and PostHeaderId=? and createname=(select createname from postheader where postid=?) "
          + " limit ?,?) as a "
          + " left join postattachment b on a.PostId=b.PostId "
          + " left join attachment c on b.AttachmentId=c.AttachmentId ";
        connection.query(sql, [
          postId,
          postId,
          rows * page,
          parseInt(rows)
        ], (err, result) => {
          connection.release();
          resolve(result);
        })
      })
    })
  },
  addPost: (postHead) => {
    return new Promise((resolve, reject) => {
      console.log("addPostDao")
      pool.getConnection((err, connection) => {
        let sql = "CALL p_addPost(?,?,?,?,?,?,?);"
        connection.query(sql, [
          postHead.PostType,
          postHead.Tag,
          postHead.BBSAreaId,
          postHead.BBSAreaName,
          postHead.PostTitle,
          postHead.CreateName,
          postHead.PostTopBody
        ],
          (err, data) => {
            connection.release();
            if (err) { console.log(err), reject(); }
            else resolve(data);
          })
      })
    })
  },
  addPostBody: (postItem) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "CALL p_addPostBody(?,?,?)"
        connection.query(sql, [
          postItem.PostId,
          postItem.PostItemBody,
          postItem.CreateName
        ], (err, data) => {
          connection.release();
          if (err) reject();
          else resolve(data);
        });
      })
    })
  },
  addPostAttachment: function (postId, fileIdList) {
    return new Promise((resolve, reject) => {
      if (fileIdList && fileIdList.length > 0) {
        pool.getConnection((err, connection) => {
          let sql = "";
          let params = []
          for (let item of fileIdList) {
            sql += "INSERT INTO postattachment VALUES(NULL,?,?);"
            params.push(postId);
            params.push(item)
          }
          connection.query(sql, params, (err, res) => {
            connection.release();
            if (err) reject(err);
            else resolve(res);
          })
        })
      } else {
        resolve();
      }
    })
  },
  addPostResponse: (response) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SET @SEQ=0;"
          + " SELECT RowNumber INTO @SEQ FROM postresponse WHERE PostId=? order by rownumber desc limit 0,1; "
          + " set @SEQ=IFNULL(@SEQ,0)+1; "
          + " insert into postresponse(rownumber,postid,responsetext,createname,createdate,`to`,isdelete)"
          + "values(@SEQ,?,?,?,sysdate(),?,'0')";
        connection.query(sql, [
          response.PostId,
          response.PostId,
          response.ResponseText,
          response.CreateName,
          response.To
        ], (err, data) => {
          connection.release();
          if (err) reject(err);
          else resolve(data);
        });
      })
    })
  },
  getPostResponse: (postId, rows, page) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SELECT ResponseId,RowNumber,PostId,ResponseText,CreateName,CreateDate,`To` FROM postresponse WHERE PostId=? limit ?,? ; "
        connection.query(sql, [
          postId,
          rows * page,
          parseInt(rows)
        ], (err, data) => {
          connection.release();
          if (err) reject(err);
          else resolve(data);
        });
      })
    })
  },
  setRemind: (remindObjId) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "INSERT INTO responseremind (RemindObjId,HasRead,IsDelete,CreateDae) VALUES (?,0,0,sysdate());"
        connection.query(sql, [
          remindObjId
        ], (err, data) => {
          connection.release();
          if (err) reject(err);
          else resolve(data);
        });
      })
    })
  },
  commentPost: (postid) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SET @Good=0;"
          + "SELECT Good into @Good from postitem where postid=?;"
          + "Set @Good=IFNULL(@Good,0)+1;"
          + "update postitem set good=@Good where postid=?;"
        connection.query(sql, [
          postid,postid
        ], (err, data) => {
          connection.release();
          if (err) reject(err);
          else resolve(data);
        });
      })
    })
  },
  unlikePost: (postid) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SET @Bad=0;"
          + "SELECT Bad into @Bad from postitem where postid=?;"
          + "Set @Bad=IFNULL(@Bad,0)+1;"
          + "update postitem set Bad=@Bad where postid=?;"
        connection.query(sql, [
          postid,postid
        ], (err, data) => {
          connection.release();
          if (err) reject(err);
          else resolve(data);
        });
      })
    })
  },
  commentResponse: (responseid) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SET @Good=0;"
          + "SELECT Good into @Good from postresponse where responseid=?;"
          + "Set @Good=IFNULL(@Good,0)+1;"
          + "update postresponse set good=@Good where postid=?;"
        connection.query(sql, [
          responseid,responseid
        ], (err, data) => {
          connection.release();
          if (err) reject(err);
          else resolve(data);
        });
      })
    })
  },
  unlikeResponse: (responseid) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SET @Bad=0;"
          + "SELECT Bad into @Bad from postresponse where responseid=?;"
          + "Set @Bad=IFNULL(@Bad,0)+1;"
          + "update postresponse set Bad=@Bad where responseid=?;"
        connection.query(sql, [
          responseid,responseid
        ], (err, data) => {
          connection.release();
          if (err) reject(err);
          else resolve(data);
        });
      })
    })
  }
}