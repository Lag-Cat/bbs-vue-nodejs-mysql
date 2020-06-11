const express = require('express')
const router = express.Router();
const postService = require('../service/post/post')
const clubService = require('../service/post/club')
const server = require('../util/server.js')
const testData = require('../test/test.js')
router.use(server.allCors());
router.all('/*', server.askAuth);


router.get('/getPostHeaderList', function (req, res, next) {
  postService.getPostList({
    PostId: req.query.PostId,
    Tag: req.query.Tag,
    PostType: req.query.PostType,
    BBSAreaId: req.query.BBSAreaId
  })
    .then(result => {
      res.json(result);
    })
})

router.get('/getPostBodyList', function (req, res, next) {
  postService.getPostBodyList(
    req.query.postId,
    req.query.rows,
    req.query.page,
  )
    .then(result => {
      res.json(result);
    })
  //res.json(testData.testData);
})

router.get('/getPostBodyOnlyAuth', function (req, res, next) {
  postService.getPostBodyOnlyAuth(
    req.query.postId,
    req.query.rows,
    req.query.page,
  )
    .then(result => {
      res.json(result);
    })
})

router.post('/addPost', (req, res, next) => {
  postService.addPost(req.body, req.headers.authorization).then(
    result => {
      res.json(result);
    },
    err => {
      res.json(err);
    })
})

router.get('/getPostList', (req, res, next) => {
  postService.getPostList(
    {
      BBSAreaId: req.query.BBSAreaId,
    },
    req.query.rows,
    req.query.page
  ).then(
    result => {
      res.json(result);
    }
  )
})

router.get('/getAllPostList', (req, res, next) => {
  postService.getPostList(
    {},
    req.query.rows,
    req.query.page
  ).then(
    result => {
      res.json(result);
    }
  )
})

router.post('/addPostBody', (req, res, next) => {
  postService.addPostBody(req.body, req.headers.authorization).then(
    result => {
      res.json(result);
    }
  )
})

// router.post('/addPostBody', (req, res, next) => {
//   postService.addPostBody(req.body,req.headers.authorization).then(
//     result=>{
//       res.json(result);
//     }
//   )
// })

router.get('/getClubList', (req, res, next) => {
  clubService.getClubList(
    req.query.clubId,
    req.query.clubname,
    req.query.tag,
    req.query.type
  ).then(
    result => {
      res.json(result);
    }
  )
})

router.get('/getFocusClubList', (req, res, next) => {
  clubService.getFocusClubList(req.headers.authorization).then(
    result => {
      res.json(result);
    }
  )
})

router.get('/searchClubList', (req, res, next) => {
  clubService.searchClubList(req.query.clubName,req.headers.authorization).then(
    result => {
      res.json(result);
    }
  )
})

router.get('/getClubById', (req, res, next) => {
  clubService.getClubList(req.query.id,null,null,null,req.headers.authorization).then(
    result => {
      res.json(result);
    }
  )
})

router.post('/addPostResponse', (req, res, next) => {
  postService.addPostResponse(req.body, req.headers.authorization).then(
    result => {
      res.json(result);
    }
  )
})

router.get('/getPostResponse', (req, res, next) => {
  postService.getPostResponse(req.query.postId, req.query.rows, req.query.page).then(
    result => {
      res.json(result);
    }
  )
})

router.post('/setRemind', (req, res, next) => {
  postService.setRemind(req.body).then(
    result => {
      res.json(result);
    }
  )
})

router.post('/focusClub', (req, res, next) => {
  clubService.focusClub(req.body,req.headers.authorization).then(
    result => {
      res.json(result);
    },
    err=>{
      res.json(err);
    }
  )
})

router.post('/cancelFocusClub', (req, res, next) => {
  clubService.cancelFocusClub(req.body,req.headers.authorization).then(
    result => {
      res.json(result);
    },
    err=>{
      res.json(err);
    }
  )
})

module.exports = router;
