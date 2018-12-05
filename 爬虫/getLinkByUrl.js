const superAgent = require('superagent')//superagent是nodejs里一个非常方便的客户端请求代理模块(类似ajax)，当你想处理get,post,put,delete,head请求时,你就应该想起该用它了.
const cheerio = require('cheerio')//为服务器特别定制的，快速、灵活、实施的jQuery核心实现.
const fs = require('fs')
const path = require('path')

const testUrl = "http://ah.10086.cn/m"//测试链接 

function getLinkByUrl(url){
    var readLink = new Promise(function(resolve,reject){
        superAgent.get(testUrl)
            .end((err,res)=>{
                if (err){
                    console.log('无效地址111')
                    reject('无效地址222')
                }else{
                    console.log('=========html=============\n ',res.text)
                    let $ = cheerio.load(res.text)
                    let obj = {
                        title:'',
                        linkArry:[],
                        count:0
                    }
                    obj.title = $('title').text()
                    $('a').each(function(ind,element){
                        let href = $(element).attr('href')||''
                        let name = $(element).text().trim()
                        let a = {
                            name,
                            href
                        }
                        obj.linkArry.push(a)
                        obj.count++
                    });
                    resolve(obj);
                }
                
          })
    })
    return readLink
    
}

function writeJsonFile(data){
    let promise = new Promise(function(resolve,reject){
        fs.exists('./data',function(exists){
            if(!exists){
                console.log('data文件夹不存在。。。')
                fs.mkdir('./data',function(err){
                    if (err) return console.log(err)
                    console.log("文件夹创建成功");
                    var file = path.join(__dirname,`data/${data.title}.json`)
                    fs.writeFile(file,JSON.stringify(data),function(err){
                        if(err){
                            return reject('json文件创建失败。。。')
                        }else{
                            resolve('json文件创建成功！')
                        }
                    })
                })
            }else{
                console.log('data文件夹存在！')
                fs.exists(`./data/${data.title}.json`,function(exists){
                    if(!exists){
                        console.log('json文件不存在。。。')
                        var file = path.join(__dirname,`data/${data.title}.json`)
                        fs.writeFile(file,JSON.stringify(data),function(err){
                            if(err){
                                return reject('json文件创建失败2。。。')
                            }else{
                                resolve('json文件创建成功2！')
                            }
                        })
                    }else{
                        resolve('json文件存在！')
                    }
                })
                
            }
        })
    })
    return promise
}

getLinkByUrl(testUrl)
    .then(function(resolve){
            let obj = resolve
            console.log('=============resolve1=',obj)
            return writeJsonFile(obj)
        },function(reject){
            console.log('=============reject1=',reject)
    })
    .then(function(resolve){
        console.log('===========resolve2=',resolve)
    },function(reject){
        console.log('===========resolve2=',reject)
    })
    .catch(function(err){
        console.log('=========err=',err)
    })

const superAgent = require('superagent')//superagent是nodejs里一个非常方便的客户端请求代理模块(类似ajax)，当你想处理get,post,put,delete,head请求时,你就应该想起该用它了.
const cheerio = require('cheerio')//为服务器特别定制的，快速、灵活、实施的jQuery核心实现.
const fs = require('fs')
const path = require('path')

const testUrl = "http://ah.10086.cn/m"//测试链接 

function getLinkByUrl(url){
    var readLink = new Promise(function(resolve,reject){
        superAgent.get(testUrl)
            .end((err,res)=>{
                if (err){
                    console.log('无效地址111')
                    reject('无效地址222')
                }else{
                    console.log('=========html=============\n ',res.text)
                    let $ = cheerio.load(res.text)
                    let obj = {
                        title:'',
                        linkArry:[],
                        count:0
                    }
                    obj.title = $('title').text()
                    $('a').each(function(ind,element){
                        let href = $(element).attr('href')||''
                        let name = $(element).text().trim()
                        let a = {
                            name,
                            href
                        }
                        obj.linkArry.push(a)
                        obj.count++
                    });
                    resolve(obj);
                }
                
          })
    })
    return readLink
    
}

function writeJsonFile(data){
    let promise = new Promise(function(resolve,reject){
        fs.exists('./data',function(exists){
            if(!exists){
                console.log('data文件夹不存在。。。')
                fs.mkdir('./data',function(err){
                    if (err) return console.log(err)
                    console.log("文件夹创建成功");
                    var file = path.join(__dirname,`data/${data.title}.json`)
                    fs.writeFile(file,JSON.stringify(data),function(err){
                        if(err){
                            return reject('json文件创建失败。。。')
                        }else{
                            resolve('json文件创建成功！')
                        }
                    })
                })
            }else{
                console.log('data文件夹存在！')
                fs.exists(`./data/${data.title}.json`,function(exists){
                    if(!exists){
                        console.log('json文件不存在。。。')
                        var file = path.join(__dirname,`data/${data.title}.json`)
                        fs.writeFile(file,JSON.stringify(data),function(err){
                            if(err){
                                return reject('json文件创建失败2。。。')
                            }else{
                                resolve('json文件创建成功2！')
                            }
                        })
                    }else{
                        resolve('json文件存在！')
                    }
                })
                
            }
        })
    })
    return promise
}

getLinkByUrl(testUrl)
    .then(function(resolve){
            let obj = resolve
            console.log('=============resolve1=',obj)
            return writeJsonFile(obj)
        },function(reject){
            console.log('=============reject1=',reject)
    })
    .then(function(resolve){
        console.log('===========resolve2=',resolve)
    },function(reject){
        console.log('===========resolve2=',reject)
    })
    .catch(function(err){
        console.log('=========err=',err)
    })

