var fs = require('fs')

// 阻塞代码实例 阻塞是按顺序执行的
var data = fs.readFileSync('../text/input.txt')
console.log(data.toString())
console.log('阻塞代码实例文件读取完毕')
