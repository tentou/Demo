
/**
 * 微信开发主程序
 * Created by tentou on 2016/9/5.
 */
'use strict'

var Koa = require('koa');

var wechat = require('./g')

var config = {
    wechat:{
        appID:'wx29caa01db5592485',
        appSecret:'ca79423ad148c52b5522d284f3924a72',
        token:'tentouceshi'
    }
};

var app = new Koa();



app.use(wechat(config.wechat));

app.listen(3000)
console.log('Listening:3000')