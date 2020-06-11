var util = require('./util.js');
const Response = require('../dao/entity/Response.js')
module.exports = {
  allCors: (setting) => {
    let data = {
      host: "*",
      methods: "GET,PUT,POST,DELETE,OPTIONS",
      withCredentials: "true",
      contentType: "text/plain;charset=utf-8"
    }
    util.extend(data, setting);
    return (req, res, next) => {
      res.header("Access-Control-Allow-Headers", "Content-Type,Access-Control-Allow-Headers,Content-Length,Accept,Authorization,X-Requested-With");
      res.header('Access-Control-Allow-Origin', data.host);
      res.header('Access-Control-Allow-Methods', data.methods);
      res.header('Access-Control-Allow-Credentials', data.withCredentials);
      res.header('Content-Type', data.contentType);
      next();
    }
  },
  askAuth: (req, res, next) => {
    let token = req.headers.authorization;
    console.log(req.method)
    if (req.method == "OPTIONS") {
      res.send(200);
    }
    else {
      if (!token) {
        res.status(403);
        res.json(
          new Response({
            code: -1,
            msg: "身份已过期，请重新登录。"
          })
        )

      } else {
        next();
      }
    }
  }
}