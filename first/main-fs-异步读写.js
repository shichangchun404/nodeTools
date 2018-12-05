var fs = require("fs")

//异步读
fs.readFile('../text/input.txt',function(err,data){
    if(err) return console.log(err)
    console.log(`文件异步读取完毕 data：${data.toString()}`)
    //异步写
    fs.writeFile('../text/output-fs.txt',data,function(err){
        if (err) return console.error(err)
         console.log("数据异步写入成功！");
    })
    
})
console.log('程序开始。。。')