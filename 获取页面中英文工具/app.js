const fs = require('fs')
const path = require('path')
const html2json = require('html2json').html2json
const minify = require('html-minifier').minify
const config = require('./config')
const CN_LANG = 'cn'
const EN_LANG = 'en'

// 获得json文件格式化ctrl + alt + m
 
startGetJsonByLang(CN_LANG)
startGetJsonByLang(EN_LANG)
function startGetJsonByLang(lang) {
  let componentString = ''
  config.forEach(item => {
    fs.readFile(path.resolve(__dirname, `${item.dataPath}/${lang}.html`), 'utf-8', (err, data) => {
      if (err) throw err
      let itemConfig = {
        lang: lang,
        mark: item.mark
      }
      data = data.substring(data.indexOf('<body>'), data.indexOf('</body>'))
  
      // 压缩html内容 防止出现中英文数据不对等以及换行符的问题
      let minifiledHtml = minify(data, {
        removeComments: true, // 除去注释
        collapseWhitespace: true, // 除去空格
        minifyJS: true, // 是否压缩html里的js（使用uglify-js进行的压缩）
        minifyCSS: true, // 是否压缩html里的css（使用clean-css进行的压缩）
      })
     
      // 将html转换成json数据
      let jsonData4Html = html2json(minifiledHtml)

      // 解析有效数据
      let effectiveData = getEffectiveData(jsonData4Html, itemConfig)
      
      // 创建json文件
      let jsonData = createLangJsonFile(effectiveData,itemConfig)
      
      // 创建组件 中英文只要执行一次
      if (itemConfig.lang === CN_LANG) {
        fs.readFile(path.resolve(__dirname,`${item.dataPath}/index.vue`), 'utf-8',(err,data) =>{
          if (err) throw err
          console.log('=============\n\n\n',jsonData)
          componentString = markPortalComponent(data,jsonData,itemConfig)
        })
      }
    })
  })
}  

function getEffectiveData (jsonData4Html,itemConfig) {
  if (jsonData4Html.child.length === 0) {
    console.log(`${itemConfig.mark} 子节点为空`)
    return 
  }
  let bodyDataArr = jsonData4Html.child[0].child
  let plainData = getPlainData(bodyDataArr)
  return plainData
} 

function getPlainData (bodyDataArr) {
  let result = []
  bodyDataArr.forEach((item,index) => {
    if (item.node === 'text' && item.text.trim() !=='') { // 文本节点
      let obj = {
        text: item.text
      }
      result.push(obj)
    } else  if (item.child && item.child.length > 0) { // 含有子节点的元素节点 单标签元素节点不含child
      result = result.concat(getPlainData(item.child))
    }
  })
  return result
}

function createLangJsonFile(effectiveData,itemConfig) {
  let obj = {}
  effectiveData.forEach((item, index) => {
    obj[`${itemConfig.mark}_${index+1}`] = item.text
  })
  fs.writeFile(`./lang/${itemConfig.lang}/${itemConfig.mark}.json`, JSON.stringify(obj), 'utf-8',err =>{
    if (err) throw err;
    console.log(`./lang/${itemConfig.lang}/${itemConfig.mark}.json has been created!`);
  })
  return obj
}

function markPortalComponent(component, data, itemConfig) {
    for (let goods in data) {
      try {
        component = component.replace(/>\n*/gm, ">");
        component = component.replace(/>\s*/gm, ">");
        component = component.replace(/\s*<\//gm, "</");
        /**
         * replace 处理特殊字符导致的语法错误
         */
        // eval('var pattern =/>[\s\S*]'+truck[goods].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')+'[\s\S*]</g')
        let pattern = new RegExp(
          ">" +
            data[goods].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") +
            "<",
          "gm"
        );
        component = component.replace(pattern, `>{{$t('${itemConfig.mark}.${goods}')}}<`);
      } catch (e) {
        console.log("error:" + e);
      }
    }
    fs.writeFile(`./components/${itemConfig.mark}.vue`, component, 'utf-8',err =>{
      if (err) throw err;
      console.log(`./components/${itemConfig.mark}.vue has been created!`);
    })
}