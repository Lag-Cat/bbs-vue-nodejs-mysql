const getPixels = require('get-pixels')
//const gm = require('gm');
const fs = require('fs')
module.exports = {
    readImage: (file) => {
        return new Promise((resolve, reject) => {
            // getPixels(file.path, function (err, pixels) {
            //     if (err) reject(err);
            //     else resolve({
            //         width: pixels.shape[0],
            //         height: pixels.shape[1],
            //         path:file.path,
            //         filename:file.filename,
            //         size:file.size
            //     })
            // })
            // fs.readFile(file.path,'binary',function(err,  file)  {
            //     if  (err)  {
            //         console.log(err);
            //         return;
            //     }else{
            //         console.log("输出文件");
            //         let a=file;
            //     }
            // });

            // resolve();

            resolve({
                width: 0,
                height: 0,
                path: file.path,
                filename: file.filename,
                size: file.size
            })
        })
    }
}