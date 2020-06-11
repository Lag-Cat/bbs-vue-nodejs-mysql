import baseFileURL from '../config/baseFileUrl'
import util from '../util/util.js'
export const filePath = (val) => {
  return baseFileURL + '?id=' + val
}

export const filePathArr = (arr, keyName) => {
  let newArr = []
  arr.map(item => {
    newArr.push(baseFileURL + '?id=' + item[keyName])
  })
  return newArr
}

export const dataTest = (val) => {
  return val
}

export const id2FilePath = (value) => {
  if (value) {
    let newArr = []
    for (let i = 0; i < value.length; i++) {
      newArr.push(baseFileURL + '?id=' + value[i].AttachmentId)
    }
    return newArr
  } else {
    return value
  }
}

export const datetime2String = (val, type, formatter) => {
  if (type === 'format') {
    // 格式化为时间
    return util.dateFormatter(formatter, val)
  } else if (type === 'recently') {
    // 转为时间提示
    return util.date2Recently(val)
  } else {
    // 返回原数据
    return util.dateFormatter('yyyy-MM-dd', val)
  }
}

export const num2Bool = (val) => {
  if (val > 0) { return true } else { return false }
}
