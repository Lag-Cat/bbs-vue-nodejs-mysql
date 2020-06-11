var express = require('express');
var router = express.Router();
var userService = require('../service/users/users.js')
var server = require('../util/server.js')
router.use(server.allCors());
router.all('*', server.askAuth);
/* GET users listing. */
router.get('/getUserNote', function (req, res, next) {
  userService.getUserNote(req.headers.authorization).then(
    result => {
      res.json(result);
    }, err => {
      res.json(err);
    }
  )
});

router.post('/setUserNote', function (req, res, next) {
  userService.setUserNote(req.body, req.headers.authorization).then(
    result => {
      res.json(result);
    }, err => {
      res.json(err);
    }
  )
});

router.get('/getUserCount', function (req, res, next) {
  userService.getUserCount(req.headers.authorization).then(
    result => {
      res.json(result);
    }, err => {
      res.json(err);
    }
  )
});

router.get('/getUserAlterInfo', function (req, res, next) {
  userService.getUserAlterInfo(req.headers.authorization).then(
    result => {
      res.json(result);
    }, err => {
      res.json(err);
    }
  )
});

router.post('/alterUserInfo', function (req, res, next) {
  userService.alterUserInfo(req.body, req.headers.authorization).then(
    result => {
      res.json(result);
    }, err => {
      res.json(err);
    }
  )
});

module.exports = router;
