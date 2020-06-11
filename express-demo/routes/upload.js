const express = require('express')
const router = express.Router();
const server = require('../util/server.js')
const multer = require('multer')
const dirConfig=require('../config/dir/index.js')
const uploadServer = require('../service/files/upload.js')
const downloadServer = require('../service/files/download.js')
router.use(server.allCors());
//router.all('/*', server.askAuth);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage });
const imgBaseUrl = '../'



router.post('/', upload.array('image'), function (req, res, next) {
  uploadServer.upload(req.files).then(result => {
    res.json(result);
  }, err => {
    res.json(err);
  }).catch(e => {
    console.log(e);
  })
})

router.get('/getFile', function (req, res, next) {
  downloadServer.getFilePath(req.query.id).then(result => {
    res.sendFile(dirConfig.systemPath+'\\'+result.replace('/','\\'))
  }, err => {
    res.status(404)
  })
})

module.exports = router