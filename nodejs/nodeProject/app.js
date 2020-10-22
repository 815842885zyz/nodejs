/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




var http = require('http');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '172.16.101.184',
  user     : 'apply',
  password : 'Apply@123',
  database: 'injured_dataplatform'
});
/!*connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();*!/
//开始你的mysql连接
connection.connect();

var server = http.createServer(function (req, res) {
  console.log(req);
  //如果你发一个GET到http://127.0.0.1:9000/test
  var url_info = require('url').parse(req.url, true);
  //检查是不是给/test的request
  if(url_info.pathname === '/test'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    connection.query('SELECT * FROM `r85u40z94p`.`user`  order by rand()  LIMIT 5',function(err,rows,fields){
      //处理你的结果
      // res.end(rows.constructor);
      // 输出结果
      res.end(JSON.stringify(rows));

      console.log(rows.constructor);
      console.log(typeof(rows));
      res.end(rows.join);
      console.log(err);
      console.log(fields);
    });
  }
  //这个是用来回复上面那个post的，显示post的数据以表示成功了。你要是有别的目标，自然不需要这一段。
  else{
    req.pipe(res);
  }
});
server.listen(9000, '127.0.0.1');
//在server关闭的时候也关闭mysql连接
server.on('close',function(){
  connection.end();
});
console.log('listening on port  9000');


module.exports = app;*/
var mysql      = require('mysql');
var express = require('express');
var app = express();
var connection = mysql.createConnection({
  host     : '172.16.101.184',
  user     : 'apply',
  password : 'Apply@123',
  database: 'injured_dataplatform'
});

connection.connect();

/*connection.query("SELECT * from med_alias_copy where alias='紫金'", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  console.log('The solution is: ');
});*/
// connection.end();
app.get('/user', (req, res) => {
  connection.query("SELECT * from med_alias_copy where alias='紫金'", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    console.log('The solution is: ');
    res.status(200).json(results);
  });
})
const hostname = '127.0.0.1';
const port = 3000
app.listen(port, hostname, () => {
  console.log(`❗❗❗ Server is running at http://${hostname}:${port}/`)
})
