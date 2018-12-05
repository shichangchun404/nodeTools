var fs = require('fs')
var data = 'hello shicc ,i am from aq';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('../text/input.txt')

// 使用 utf8 编码写入数据
writerStream.write(data,'utf8')

// 标记文件末尾
writerStream.end()

writerStream.on('finish',function(){
    console.log('写入完毕')
})

writerStream.on('error',function(err){
    console.log(err.stack)
})
 
 console.log("程序执行完毕");


