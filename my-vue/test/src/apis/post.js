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
  getPostBodyById: (postId, rows, page) => {
    return new Promise((resolve, reject) => {
      axios.get('/post/getPostBodyList?postId=' + postId + "&rows=" + rows + "&page=" + page)
        .then(res => {
          resolve(res);
        })
    })
  }
}

export default post;