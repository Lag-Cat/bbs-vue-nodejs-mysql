// 重写axios配置,重写get/post方法,实现拦截器
import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import baseURL from './baseUrl'
import store from '../store'
// import store from '../store/index'
import { Toast } from 'vant'
const http = {}
// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 10,
  baseURL,
  crossDomain: true
})

instance.defaults.crossDomain = true
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 检查token
    // console.log(store.state.userToken);
    // if (store.state.userToken) {
    //   //在请求头中加入Authorization以存放token供后台做身份校验
    //   config.headers.Authorization = store.state.userToken;
    // }
    // else {
    //   Message({
    //     message: "登录过期或验证出错，请重新登录",
    //     type: "error",
    //     duration: 5000
    //   });
    //   //登录失败跳回主页
    //   setTimeout(() => {
    //     this.$router.push('/');
    //   }, 5000);
    //   return false;
    // }
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    } else {
      Toast.fail({ message: '登录过期或验证出错，请重新登录', duration: 1000 * 5 })
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000 * 5)
    }

    // 为请求加上时间戳,防止请求相同从缓存里面读取
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000
      }
    }
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 这里主要拦截服务器返回的错误信息
    if (error && error.response) {
      // eslint-disable-next-line no-unused-vars
      let msg = ''
      let response = error.response
      switch (response.status) {
        // 200为请求成功
        case '400':
          msg = ''
          break
        case '401':
          msg = ':登录失败,请重新登录'
          break
        case '403':
          msg = ':访问被拒绝'
          break
        case '404':
          msg = ':未找到指定资源'
          break
        case '500':
          msg = ':服务器错误,请联系系统管理员'
          break
        default:
          msg = ''
          break
      }
      // Message({ message: '请求失败' + msg, type: 'error', duration: 2000 });
      return new Promise(error)
    }
  }
)

// 重写get方法
http.get = function (url, params) {
  return new Promise((resolve, reject) => {
    // 使用Promise异步
    try {
      instance
        .get(url, params)
        .then(response => {
          // 处理后端业务中传回的错误信息
          if (!response) {
            // eslint-disable-next-line no-throw-literal
            throw '请求失败'
          } else {
            if (response.code && response.data.code < 0) {
              // Message({ message: response.data.msg, type: 'error', duration: 2000 });
              reject(response.data.msg)
            } else {
              resolve(response.data)
            }
          }
        })
        .catch(e => {
          // Message({ message: e, duration: 2000 });
        })
    } catch (e) {
      // Message({ message: e, duration: 2000 });
    }
  }
  )
}

// 重写post方法
http.post = function (url, data, params) {
  return new Promise((resolve, reject) => {
    // 使用Promise异步
    instance
      .post(url, data, params)
      .then(response => {
        // 处理后端传回的错误信息
        if (response.code && response.data.code < 0) {
          // Message({ message: response.data.msg, type: 'error', duration: 2000 });
          reject(response.data.msg)
        } else {
          resolve(response.data)
        }
      })
      .catch(e => {
        // Message({ message: e, duration: 2000 });
      })
  }
  )
}

// 导出文件
export default http
