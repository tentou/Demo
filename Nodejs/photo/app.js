var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable');   //解析上传文件

var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photo');

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //模板引擎的位置其实可以写成 app.set(views,__dirname+'/views');
app.set('view engine', 'ejs');
app.set('titles','Photo');             //设置一个全局变量titles，ejs中通过<%=settings.titles%>来引用

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());           // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //Express 内置的唯一一个中间件。是基于 serve-static 开发的，负责托管 Express 应用内的静态资源。

app.use('/', photos);   //指定路由  第一个参数是路径（中间件的路径可以用来区分用户），第二个参数是上边var的一个依赖文件变量
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {     //开发环境
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
