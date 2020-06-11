import baseFileURL from '../config/baseFileUrl.js'
const util = {
  extend: function (target, source, flag) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        flag ? (target[key] = source[key]) : (target[key] === void 0 && (target[key] = source[key]))
      }
    }
    return target
  },
  left: (str, maxLength, joinStr = '0') => {
    return (Array(maxLength + 1).join(joinStr) + str).slice(-maxLength)
  },
  dateFormatter: function (formatter, date) {
    let dt = new Date(Date.parse(date) - 8 * 60 * 60 * 1000)// 时区问题
    if (formatter) {
      return formatter
        .replace('yyyy', dt.getFullYear())
        .replace('MM', this.left(dt.getMonth() + 1, 2))
        .replace('dd', this.left(dt.getDate(), 2))
        .replace('hh', this.left(dt.getHours(), 2))
        .replace('mm', this.left(dt.getMinutes(), 2))
        .replace('ss', this.left(dt.getSeconds(), 2))
    } else {
      return 'yyyy-MM-dd hh:mm:ss'
        .replace('yyyy', dt.getFullYear())
        .replace('MM', this.left(dt.getMonth() + 1, 2))
        .replace('dd', this.left(dt.getDate(), 2))
        .replace('hh', this.left(dt.getHours(), 2))
        .replace('mm', this.left(dt.getMinutes(), 2))
        .replace('ss', this.left(dt.getSeconds(), 2))
    }
  },
  isArray: function (val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  },
  hasArray: function (arr) {
    if (arr && arr.length > 0) {
      return true
    } else {
      return false
    }
  },
  date2Recently: function (date) {
    // let dt=new Date(Date.parse(date)-8*60*60*1000);
    let diff = (Date.now() - Date.parse(date)) / 1000
    // 开始
    if (diff < 0) { return '你超越了时空!' }
    if (diff < 60) { return parseInt(diff) + '秒前' }
    diff /= 60
    if (diff < 60) { return parseInt(diff) + '分钟前' }
    diff /= 60
    if (diff < 60) { return parseInt(diff) + '小时前' }
    diff /= 24
    if (diff < 24) { return parseInt(diff) + '天前' }
    diff /= 30
    if (diff < 30) { return parseInt(diff) + '个月前' }
    diff /= 12
    if (diff < 30) { return parseInt(diff) + '年前' } else {
      return '很久很久以前'
    }
  },
  filePath: function (val) {
    return baseFileURL + '?id=' + val
  }
}

export default util
