//import axiosFile from '../config/httpConfigFile.js'
import util from '../util/util.js'
import axios from 'axios'


const files = {
  uploadFile: (files, type = 'image') => {
    return new Promise((resolve, reject) => {
      let formData = new FormData;

      files.map(file => { formData.append(type, file) })

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.post('http://localhost:3000/upload', formData, config).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
    })
  }
}

export default files