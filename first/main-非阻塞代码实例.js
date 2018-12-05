var fs = require('fs')

// 非阻塞代码实例  非阻塞是不需要按顺序的，
// 所以如果需要处理回调函数的参数，我们就需要写在回调函数内。
fs.readFile('../text/input.txt',function(err,data){
    if(err) return console.log(err)
    console.log(data.toString())
})
console.log('非阻塞代码实例 执行完毕')
