/**
 * 创建错误提醒逻辑
 * Created by tentou on 2016/9/2.
 */

var express = require('express');
var res = express.response;     //这个是express响应对象用的原型，向这个对象添加对象，意味着所有中间件和路由都能访问它

//如果请求报错，就调用这个函数，给这个请求的session赋一个message属性，这个属性包含了我要输出的具体报错内容
res.message = function (msg,type) {
    type = type || 'info';
    var sess = this.req.session;    //获取当前请求的session对象
    session.message = session.message || [];
    sess.message.push({type:type,msg:msg})
}
res.error = function (msg) {
     return this.message(msg,'error')

}
//因为上列代码获取到session的message，这个数据需要持久化并且传回给页面，因为有可能出现跳转页面，所以利用res.local.message来操作
module.exports = function (req,res,next) {
    res.locals.message = req.session.message||[];
    res.locals.removeMessages = function () {
        res.local.message = [];

    }
    next();

}