let mysql = require('mysql')
let $conf = require('../../config/db/mysql.js')
let $util = require('../../util/util.js')

let conf = $util.extend({}, $conf.mysql);
conf = $util.extend(conf, { database: 'userdb' });
let pool = mysql.createPool(conf)//创建连接池

//const mysqlErr = require('../../enum/mysqlErr.js')

module.exports = {
  getLogin: (user) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "select usercode,userName,md5password from userinfo where usercode=? "
        connection.query(sql, [
          user.usercode
        ],
          (err, result) => {
            connection.release();
            resolve(result)
          });
      })
    })
  },
  getUserInfo: (user) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SELECT UserCode,UserName FROM userinfo where UserCode=?"
        connection.query(sql, [user.UserCode], (err, data) => {
          connection.release();
          resolve(data);
        });
      })
    })
  },
  getUserAllInfo: (user) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SELECT UserCode,UserName,Email,Phone,Address FROM userinfo where UserCode=?"
        connection.query(sql, [user.UserCode], (err, data) => {
          connection.release();
          resolve(data);
        });
      })
    })
  },
  register: (user) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = " call p_register(?,?,?,?,?,?,?)"
        connection.query(sql, [
          user.UserCode,
          user.UserName,
          user.Email,
          user.Phone,
          user.Address,
          user.CreateTime,
          user.Password
        ],
          (err, result) => {
            connection.release();
            resolve(result)
          });
      })
    });
  },
  checkUser: (user) => {
    pool.getConnection((err, connection) => {
      let sql = "select 1 from userinfo where usercode=? "
      connection.query(sql, [
        user.usercode
      ],
        (err, result) => {
          connection.release();
          resolve(result)
        });
    })
  },
  setUserNote: (mynote) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SET @SEQ=0; "
          + " SELECT SEQ INTO @SEQ FROM mynote WHERE UserCode=? ORDER BY SEQ DESC LIMIT 0,1; "
          + " SET @SEQ=IFNULL(@SEQ,0)+1; "
          + " INSERT INTO mynote values(null,?,@SEQ,?,SYSDATE(),0,0,0); "
          + " SELECT Id,Note,CreateDate,IsDelete,Good,Bad FROM mynote WHERE Id=last_insert_id(); ";
        connection.query(sql, [
          mynote.UserCode,
          mynote.UserCode,
          mynote.Note
        ], (err, result) => {
          connection.release();
          if (err) reject(err);
          else resolve(result);
        })
      })
    })
  },
  getUserNote: (userCode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SELECT Id,Note,CreateDate,IsDelete,Good,Bad FROM mynote WHERE userCode=? order by CreateDate desc limit 0,1 ";
        connection.query(sql, [userCode], (err, result) => {
          connection.release();
          if (err) reject(err);
          else resolve(result);
        })
      })
    })
  },
  getUserCount: (userCode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "select a.usercode,clubCount,postCount,responseCount from userdb.userinfo a "
          + " left join (select usercode , count(1) as clubCount from bbs.focusclub where usercode=? group by usercode ) b on a.usercode=b.usercode "
          + " left join (select createname , count(1) as postCount from bbs.postitem where createname =? group by createname ) c on a.usercode=c.createname "
          + " left join (select createname, count(1) as responseCount from bbs.postresponse where createname=? group by createname) d on a.usercode=d.createname "
          + " where a.usercode=? ";
        connection.query(sql, [userCode, userCode, userCode, userCode], (err, result) => {
          connection.release();
          if (err) reject(err);
          else resolve(result);
        })
      })
    })
  },
  getUserAlterInfo: (userCode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = " select a.userName,a.email,a.phone,a.address,a.sex,photo from userdb.userinfo a where a.usercode=? ";
        connection.query(sql, [userCode], (err, result) => {
          connection.release();
          if (err) reject(err);
          else resolve(result);
        })
      })
    })
  },
  alterUserInfo: (userInfo) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = " update userinfo set username=?,email=?,phone=?,address=?,sex=?,photo=? where usercode=? ";
        connection.query(sql, [
          userInfo.UserName,
          userInfo.Email,
          userInfo.Phone,
          userInfo.Address,
          userInfo.Sex,
          userInfo.Photo,
          userInfo.UserCode
        ], (err, result) => {
          connection.release();
          if (err) reject(err);
          else resolve(result);
        })
      })
    })
  }
}