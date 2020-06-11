var express = require('express');
var router = express.Router();
var userService = require('../service/users/login.js')
var server = require('../util/server.js')
router.use(server.allCors());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getusername', function (req, res, next) {
  res.json({})
});

router.post('/login', function (req, res, next) {
  console.log("begin")
  userService.userLogin(req.body).then(
    result => {
      res.cookie('usercode', req.body.usercode, { maxAge: 60 * 60 * 24 * 1 });
      res.json(result.result);
    }, err => {
      console.log(err);
    }
  )
});

router.post('/register', function (req, res, next) {
  userService.register(req.body).then(
    result => {
      res.json(result);
    }, err => {
      res.json(err);
    }
  )
});

module.exports = router;
