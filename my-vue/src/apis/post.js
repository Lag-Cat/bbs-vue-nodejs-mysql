import axios from '../config/httpConfig.js'
const post = {
  addPost: (post) => {
    return new Promise((resolve, reject) => {
      axios.post('/post/addPost', post)
        .then(res => {
          resolve(res);
        })
    })
  },
  addPostBody: (postBody) => {
    return new Promise((resolve, reject) => {
      axios.post('/post/addPostBody', postBody)
        .then(res => {
          resolve(res);
        })
    })
  },
  getPostList: (BBSAreaId, rows, page) => {
    return new Promise((resolve, reject) => {
      axios.get('/post/getPostList?BBSAreaId=' + BBSAreaId + "&rows=" + rows + "&page=" + page)
        .then(res => {
          resolve(res);
        })
    })
  },
  getAllPostList: (rows, page) => {
    return new Promise((resolve, reject) => {
      axios.get('/post/getAllPostList?rows=' + rows + '&page=' + page)
        .then(res => {
          resolve(res);
        })
    })
  },
  getPostBodyById: (postId, rows, page) => {
    return new Promise((resolve, reject) => {
      axios.get('/post/getPostBodyList?postId=' + postId + "&rows=" + rows + "&page=" + page)
        .then(res => {
          resolve(res);
        },
          err => {
            reject();
          })
    })
  },
  getPostBodyOnlyAuth: (postId, rows, page) => {
    return new Promise((resolve, reject) => {
      axios.get('/post/getPostBodyOnlyAuth?postId=' + postId + "&rows=" + rows + "&page=" + page)
        .then(res => {
          resolve(res);
        },
          err => {
            reject();
          })
    })
  },
  addPostResponse: (response) => {
    return new Promise((resolve, reject) => {
      axios.post('/post/addPostResponse', response)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  },
  getPostResponse: (postId, rows, page) => {
    return new Promise((resolve, reject) => {
      axios.get('/post/getPostResponse?postId=' + postId + "&rows=" + rows + "&page=" + page)
        .then(res => {
          resolve(res);
        },
          err => {
            reject();
          })
    })
  },
  setRemind: (response) => {
    return new Promise((resolve, reject) => {
      axios.post('/post/setRemind', response)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  },
}

export default post;