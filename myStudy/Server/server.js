/*// 导入http模块
var http = require('http');
http.createServer(function (req, res) {
  res.write('<head><meta charset="utf-8"/></head>');
  res.write('成功');
  res.end('Hello World');
}).listen(8000);*/
var bodyParser = require('body-parser');
//对数据进行解析
var urlencodeParser = bodyParser.urlencoded({extended:true});
const mysql = require('mysql');
const express = require('express');
const cors = require('cors'); // 解决跨域
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));
app.use(urlencodeParser);
const connection = mysql.createConnection({
  host     : '172.16.101.184', // 数据库ip
  user     : 'apply', // 数据库用户名
  password : 'Apply@123', // 数据库密码
  database: 'injured_dataplatform' // 数据库名称
});
connection.connect((err) => {
  if (err) throw err;
  console.log('连接成功');
});
app.get('/server', (req, res) => {
  connection.query("SELECT * from med_alias_copy where alias='紫金'", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.status(200).json(results);
  });
});

// 查询单条内容(以拼路径的方式请求)
app.get('/userDetail/:id', (req, res) => {
  console.log(req);
  const sql = `select * from med_alias_copy where id=${req.params.id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.status(200).json(results);
  });
});
// 查询单条内容（以问号的形式请求）
app.get('/userDetailById', (req, res) => {
  console.log(req);
  console.log(req.query);
  const sql = `select * from med_alias_copy where id=${req.query.id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.status(200).json(results);
  });
});
// 删除单条内容（以问号的形式请求）
app.get('/deleteItemById', (req, res) => {
  console.log(req);
  console.log(req.query);
  const sql = `delete from med_alias_copy where id=${req.query.id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.status(200).json('删除成功');
  });
});

// post 请求插入数据
app.post('/addUser', (req, res) => {
  // console.log(req);
  const text = req.body;
  console.log(text);
  const sql = `insert into med_alias_copy set?`;
  connection.query(sql, text,function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.status(200).json('插入成功');
  });
});

// 前端项目访问接口的地址
const hostname = '127.0.0.1';
const port = 9000;
app.listen(port, hostname, () => {
  console.log(`❗❗❗ 服务器开启在 http://${hostname}:${port}/`)
})
