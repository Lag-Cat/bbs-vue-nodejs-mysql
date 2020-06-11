const util = require('./util.js')
module.exports = {
  getNowDateTime: (formatter) => {
    let dt = new Date();
    if (formatter) {
      return formatter
        .replace('yyyy', dt.getFullYear)
        .replace('MM', util.left(dt.getMonth() + 1, 2))
        .replace('dd', util.left(dt.getDate(), 2))
        .replace('hh', util.left(dt.getHours(), 2))
        .replace('mm', util.left(dt.getMinutes(), 2))
        .replace('ss', util.left(dt.getSeconds(), 2))
    } else {
      return "yyyy-MM-dd hh:mm:ss"
        .replace('yyyy', dt.getFullYear)
        .replace('MM', util.left(dt.getMonth() + 1, 2))
        .replace('dd', util.left(dt.getDate(), 2))
        .replace('hh', util.left(dt.getHours(), 2))
        .replace('mm', util.left(dt.getMinutes(), 2))
        .replace('ss', util.left(dt.getSeconds(), 2))
    }
  }
}