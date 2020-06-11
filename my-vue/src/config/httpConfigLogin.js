//重写axios配置,重写get/post方法,实现拦截器
import axios from 'axios';
//import { Message, MessageBox } from 'element-ui'
import baseURL from './baseUrl'
import { Toast } from 'vant';
//import store from '../store/index'

const http = {}
//创建axios实例
const instance = axios.create({
  timeout: 1000 * 10,
  baseURL
});

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    //为请求加上时间戳,防止请求相同从缓存里面读取
    if (config.method == 'post') {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000,
      }
    }
    if (config.method == "get") {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    //这里主要拦截服务器返回的错误信息
    if (error && error.response) {
      let msg = "";
      switch (response.status) {
        //200为请求成功
        case '400':
          msg = "";
        case '401':
          msg = ':登录失败,请重新登录';
        case '403':
          msg = ':访问被拒绝';
        case '404':
          msg = ':未找到指定资源';
        case '500':
          msg = ':服务器错误,请联系系统管理员';
          break;
      }
      return new Promise(error);
    }
  }
);

//重写get方法
http.get = function (url, params) {
  return new Promise((resolve, reject) => {
    //使用Promise异步
    try {
      instance
        .get(url, params)
        .then(response => {
          //处理后端业务中传回的错误信息
          if (!response) {
            throw "请求失败";
          } else {
            if (response.code && response.data.code < 0) {
              reject(response.data.msg);
            } else {
              resolve(response.data);
            }
          }
        })
        .catch(e => {
        });
    } catch (e) {
    }
  }
  )
}

//重写post方法
http.post = function (url, data, params) {
  return new Promise((resolve, reject) => {
    //使用Promise异步
    instance
      .post(url, data, params)
      .then(response => {
        //处理后端传回的错误信息
        if (response.code == 1) {
          resolve(response.data);
        }
        else {
          Toast.fail(response.msg);
        }

      })
      .catch(e => {
      });
  }
  )
}

//导出文件
export default http