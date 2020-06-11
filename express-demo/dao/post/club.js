let mysql = require('mysql')
let $conf = require('../../config/db/mysql.js')
let $util = require('../../util/util.js')

var conf = $util.extend({}, $conf.mysql);
conf = $util.extend(conf, { database: 'bbs' });
var pool = mysql.createPool(conf)//创建连接池

module.exports = {
  addClub: (club) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "INSERT INTO club(Name,Tag,Type,IconId,CreateDate,CreateName,IsDelete) "
          + " VALUES(?,?,?,?,sysdate(),?,0) ";
        connection.query(sql, [
          club.Name,
          club.Tag,
          club.Type,
          club.IconId,
          club.CreateName,
        ], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  },
  updateClub: (club) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "UPDATE club SET Name=?,Tag=?,Type=?,IconId=? WHERE Id=?";
        connection.query(sql, [
          club.Name,
          club.Tag,
          club.Type,
          club.IconId,
          club.Id
        ], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  },
  getClubList: (clubId, name, tag, type,userCode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SELECT Id,Name,Tag,Type,IconId,case  when c.clubId is null then 0 else 1 end as isFocus FROM club a "
          + " LEFT JOIN (SELECT clubId from focusclub WHERE usercode=? ) c on a.id=c.clubid "
          + " WHERE (( ? IS NOT NULL AND Id=? ) "
          + " OR ( ? IS NOT NULL AND NAME=? ) "
          + " OR ( ? IS NOT NULL AND Tag=? ) "
          + " OR ( ? IS NOT NULL AND Type=? )) "
          + " AND IFNULL(IsDelete,'0')='0' ";
        connection.query(sql, [
          userCode,
          clubId, clubId,
          name, name,
          tag, tag,
          type, type
        ], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  },
  searchClubList: (name, usercode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = " SELECT Id,Name,Tag,Type,IconId,focusCount,case  when c.clubId is null then 0 else 1 end as isFocus FROM club a "
          + " LEFT JOIN (SELECT clubid, count(1) as focusCount FROM focusclub GROUP BY clubid) b ON a.id=b.clubid "
          + " LEFT JOIN (SELECT clubId from focusclub WHERE usercode='" + usercode + "' ) c on a.id=c.clubid "
          + " WHERE name like '%" + name + "%' ";
        connection.query(sql, [], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  },
  deleteClub: (clubId) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "UPDATE club SET isdelete=1 WHERE Id=?";
        connection.query(sql, [
          clubId
        ], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  },
  focusClub: (clubId, userCode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "INSERT INTO focusclub(ClubId,UserCode,CreateDate,IsDelete) VALUES(?,?,sysdate(),0)";
        connection.query(sql, [
          clubId,
          userCode
        ], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  },
  cancelFocusClub: (clubId, userCode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "UPDATE focusclub SET isdelete=1 WHERE ClubId=? and UserCode=?";
        connection.query(sql, [
          clubId,
          userCode
        ], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  },
  getFocusClubList: (usercode) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        let sql = "SELECT a.ID as ClubId,a.Name,a.Tag,a.Type,a.IconId FROM club a LEFT JOIN focusclub b ON a.ID=b.ClubId WHERE b.usercode=?";
        connection.query(sql, [
          usercode
        ], (err, result) => {
          connection.release();
          if (err) reject(err)
          else resolve(result);
        })
      })
    })
  }
}