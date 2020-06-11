import axios from '../config/httpConfigLogin.js'
const login = {
    userLogin: (usercode, passowrd) => {
        return new Promise((resolve, reject) => {
            axios.post('/login/login', { "usercode": usercode, "password": passowrd })
                .then(res => {
                    resolve(res);
                })
        })

    }
}

export default login;