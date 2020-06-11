export default {
  getToken: function () {
    if (arguments.length === 1) {
      // 0个参数
      return getTokens()[arguments[0]]
    } else {
      return getTokens()
    }
  },
  setToken: function (key, val, hours) {
    let exp = new Date()
    exp.setTime(exp.getTime() + hours * 60 * 60 * 1000)
    document.cookie = key + '=' + val + ';expires=' + exp.toString()
  }
}

function getTokens () {
  let arr = document.cookie.split(';')
  let res = {}
  arr.map(item => {
    let tmp = item.split('=')
    let key = tmp[0]
    let val = tmp[1]
    res[key] = val
  })
  return res
}
