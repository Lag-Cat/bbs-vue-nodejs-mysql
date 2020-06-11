import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userCode: '',
    userName: '',
    refreshTstamp: '',
    note: '',
    targetClub: '',
    indexRouterKeepalive: []// index页面(次级路由)中keepalive的include页面,结构:['a','b']
  },
  getters: {
    getToken: state => {
      return state.authorization
    },
    getUserCode: state => {
      return state.userCode
    },
    getUserName: state => {
      return state.userName
    },
    getRefreshTstamp: state => {
      return state.refreshTstamp
    },
    getNote: state => {
      return state.note
    },
    getIndexRouterKeepalive: state => {
      return state.indexRouterKeepalive
    }
  },
  mutations: {
    setToken: (state, val) => {
      state.token = val
    },
    setUsercode: (state, val) => {
      state.userCode = val
    },
    setUserName: (state, val) => {
      state.userName = val
    },
    setRefreshTstamp: (state, val) => {
      state.refreshTstamp = val
    },
    loginOut: (state) => {
      state.token = ''
      state.userCode = ''
      state.userName = ''
      state.refreshTstamp = ''
    },
    setNote: (state, val) => {
      state.note = val
    },
    // setIndexRouterKA: (state, routerName, keepAlive) => {
    //     if (!keepAlive) {
    //         //增加
    //         if (!state.indexRouterKeepalive.find(item => { return item === routerName })) {
    //             //判断是否存在该元素,存在的话就不变,不存在就增加
    //             state.indexRouterKeepalive.push(routerName);
    //         }
    //     } else {
    //         //删除
    //         let index = state.indexRouterKeepalive.indexOf(routerName);
    //         state.indexRouterKeepalive.splice(index, index);
    //     }
    // }
    setIndexRouterKeepAlive: (state, routerName) => {
      let index = state.indexRouterKeepalive.indexOf(routerName)// 判断是否存在该页面
      if (index < 0) { // 如果不存在就入栈
        // 入栈
        state.indexRouterKeepalive.push(routerName)
      } else {
        // 出栈
        state.indexRouterKeepalive.splice(index, state.indexRouterKeepalive.length - 1)
      }
    }
  },
  actions: {

  }
})

export default store
