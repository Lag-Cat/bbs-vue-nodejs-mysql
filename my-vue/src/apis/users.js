import axios from '../config/httpConfig.js'
const users = {
    setNote: note => {
        return new Promise((resolve, reject) => {
            axios.post('/users/setUserNote', note).then(res => {
                resolve(res);
            })
        })
    },
    getNote: () => {
        return new Promise((resolve, reject) => {
            axios.get('/users/getUserNote').then(res => {
                resolve(res);
            })
        })
    },
    getUserCount: () => {
        return new Promise((resolve, reject) => {
            axios.get('/users/getUserCount').then(res => {
                resolve(res);
            },
                err => {
                    reject();
                })
        })
    },
    getUserAlterInfo: () => {
        return new Promise((resolve, reject) => {
            axios.get('/users/getUserAlterInfo').then(res => {
                resolve(res);
            },
                err => {
                    reject();
                })
        })
    },
    alterUserInfo: (userInfo) => {
        return new Promise((resolve, reject) => {
            axios.post('/users/alterUserInfo', userInfo).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            })
        })
    }
}

export default users