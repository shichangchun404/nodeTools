var express = require('express');
var bodyParser = require('body-parser')
var fs = require("fs");
var multer = require('multer')
var cookieParser = require('cookie-parser')
var util = require('util');

var app = express();

app.use(cookieParser())
 
//静态资源文件
app.use(express.static('static'));//http://127.0.0.1:8091/hh.jpg

app.get('/index.html', function (req, res) {
  console.log("Cookies: " + util.inspect(req.cookies));
  res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
  // 输出 JSON 格式
  var response = {
      "first_name":req.query.first_name,
      "last_name":req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/process_post', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  var response = {
      "first_name":req.body.first_name,
      "last_name":req.body.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

app.get('/', function (req, res) {
  res.send('<h6>你好，get</h6>');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.post('/file_upload', function (req, res) {
  console.log(req.files[0]);  // 上传的文件信息
  var des_file = __dirname + "/static/" + req.files[0].originalname; //文件上传路径
  fs.readFile( req.files[0].path, function (err, data) {
       fs.writeFile(des_file, data, function (err) {
        if( err ){
             console.log( err );
        }else{
              response = {
                  message:'File uploaded successfully', 
                  filename:req.files[0].originalname
             };
         }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
  });
})


app.post('/', function (req, res) {
  res.send('<h6>你好，post</h6>');
});

app.get('/a*', function (req, res) {
  res.send('<h6>你好，aa***********</h6>');
});

var server = app.listen(8091,function(){
  var port = server.address().port
  var host = server.address.address
  console.log('the server is running at http://127.0.0.1:8091/')
});
