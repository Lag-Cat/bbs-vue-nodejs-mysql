const postDao = require('../../dao/post/post')
const util = require('../../util/util.js')
const Response = require('../../dao/entity/Response.js')
const Postheader = require('../../dao/entity/Postheader.js')
const PostItem = require('../../dao/entity/Postitem.js')
const PostResponse = require('../../dao/entity/PostResponse.js')
const token = require('../../util/token.js')
module.exports = {
  getPostList: function (post, rows, page) {
    return new Promise((resolve, reject) => {
      postDao.getPostList(post, rows, page).then(res => {
        resolve(new Response({
          data: util.flat(
            res,
            ['PostId'],
            ['AttachmentId'],
            ["AttachmentId", 'AttachmentName'],
            'AttachmentList')
        }))
      })
    })
  },
  getPostBodyList: function (postId, rows, page) {
    return new Promise((resolve, reject) => {
      postDao.getPostBodyList(postId, rows, page).then(res => {
        // let test=util.flat(
        //   res,
        //   ['RowNumber','ResponseId'],
        //   ['AttachmentId'],
        //   ["AttachmentId"],
        //   'AttachmentList');
        //   let a=1;
        //   let test2=util.flat(
        //     test,
        //     ['PostId'],
        //     ['ResponseId'],
        //     ['ResponseText','ResponseId','CreateName','CreateDate','To'],
        //     'ResponseList'
        //   )
        let data = util.flat(
          res,
          ['RowNumber', 'ResponseId'],
          ['AttachmentId'],
          ["AttachmentId"],
          'AttachmentList')
        data = util.flat(
          data,
          ['PostId'],
          ['ResponseId'],
          ['ResponseText', 'ResponseId', 'ResponseCreateName', 'ResponseCreateDate', 'To'],
          'ResponseList'
        )
        let obj = {
          data: {
            postTop: data.filter(item => { return item.IsPostTop === 1 }),
            postBody: data.filter(item => { return item.IsPostTop !== 1 }),
          }
        }

        resolve(new Response({
          data: {
            postTop: data.filter(item => { return item.IsPostTop === 1 }),
            postBody: data.filter(item => { return item.IsPostTop !== 1 }),
          }
        }));
      })
    })
  },
  getPostBodyOnlyAuth: function (postId, rows, page) {
    return new Promise((resolve, reject) => {
      postDao.getPostBodyListOnlyAuth(postId, rows, page).then(res => {
        let data = util.flat(
          res,
          ['RowNumber'],
          ['AttachmentId'],
          ["AttachmentId"],
          'AttachmentList')

        let obj = {
          data: {
            postTop: data.filter(item => { return item.IsPostTop === 1 }),
            postBody: data.filter(item => { return item.IsPostTop !== 1 }),
          }
        }

        resolve(new Response({
          data: {
            postTop: data.filter(item => { return item.IsPostTop === 1 }),
            postBody: data.filter(item => { return item.IsPostTop !== 1 }),
          }
        }));
      })
    })
  },
  addPost: function (post, userToken) {
    console.log("addPostService1")
    let postheader = new Postheader({});
    postheader = util.mapping(postheader, post, true);
    postheader.CreateName = token.decrypt(userToken).id;
    let attachmentIdList = post['PostTopImage'];
    console.log("addPostService1")
    return new Promise((resolve, reject) => {
      postDao.addPost(postheader).then(
        res => {
          if (attachmentIdList) {
            postDao.addPostAttachment(res[0][0].BodyId, attachmentIdList);
          }

          resolve(new Response({
            msg: "success",
            data: {
              state: 1,
              postId: res[0][0].ID
            }
          }));
        },
        err => {
          reject(
            new Response({
              code: -1,
              msg: "发送失败",
              data: {
                state: -1,
              }
            })
          );
        })
    })
  },
  addPostBody: function (postBody, userToken) {
    let postBodyEntity = new PostItem({});
    postBodyEntity = util.mapping(postBodyEntity, postBody, true);
    postBodyEntity.CreateName = token.decrypt(userToken).id;
    let attachmentIdList = postBody.ImgId;
    return new Promise((resolve, reject) => {
      postDao.addPostBody(postBodyEntity).then(res => {
        if (attachmentIdList) {
          postDao.addPostAttachment(res[0][0].PostId, attachmentIdList);
        }
        resolve(new Response({
          msg: "success",
          data: {
            state: 1,
            data: res[0]
          }
        }));
      })
    })
  },
  addPostResponse: function (response, userToken) {
    let postResponse = new PostResponse({});
    postResponse = util.mapping(postResponse, response, true);
    postResponse.CreateName = token.decrypt(userToken).id;
    return new Promise((resolve, reject) => {
      postDao.addPostResponse(postResponse).then(res => {
        resolve(new Response({
          msg: "success",
          data: {
            state: 1,
            data: res[0]
          }
        }));
      })
    })
  },
  getPostResponse: function (postId, rows, page) {
    return new Promise((resolve, reject) => {
      postDao.getPostResponse(postId, rows, page).then(res => {
        resolve(new Response({
          data: res
        }))
      })
    })
  },
  setRemind: function (remind) {
    return new Promise((resolve, reject) => {
      postDao.setRemind(remind.remindObjId).then(res => {
        resolve(new Response({
          data: res
        }))
      })
    })
  },
}