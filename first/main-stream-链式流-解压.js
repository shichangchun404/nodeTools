var fs = require('fs')
var zlib = require('zlib')

// // 解压 input.txt.gz 文件为 input-gz.txt
fs.createReadStream('../text/input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('../text/input-gz.txt'))

console.log('文件解压完毕')