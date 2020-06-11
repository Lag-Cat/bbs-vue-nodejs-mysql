class Response {
  constructor(obj) {
    this.code = obj.code ? obj.code : 1,
      this.msg = obj.msg ? obj.msg : '',
      this.data = obj.data
  }
}

module.exports = Response