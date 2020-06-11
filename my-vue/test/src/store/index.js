import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: "",
        userCode: "",
        userName: "",
        refreshTstamp: ""
    },
    getters: {
        getToken: state => {
            return state.authorization;
        },
        getUserCode: state => {
            return state.userCode;
        },
        getUserName: state => {
            return state.userName;
        },
        getRefreshTstamp: state => {
            return state.refreshTstamp;
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
        }
    }
})

export default store;