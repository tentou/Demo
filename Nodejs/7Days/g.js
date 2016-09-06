// /**
//  * 中间件--验证Token
//  * access_token 是票据
//  * Created by tentou on 2016/9/5.
//  */
'use strict'
var sha1 = require('sha1');
var getRawBody = require('raw-body');   //处理XML数据
var Wechat = require('./wechat');
var util = require('./util');
module.exports = function(opts){
    //var wechat = new Wechat(opts);

    //加密
    return function *(next) {
        //console.log(this.query);  //URL上带的？后边的键值对
        var that = this;
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token,timestamp,nonce].sort().join('');
        var sha = sha1(str);

        if(this.method === 'GET'){
            //判断签名是否合法
            if(sha === signature){
                this.body = echostr + '';
            }else{
                this.body = 'wrong';
            }
        }else if(this.method === 'POST'){
            if(sha !== signature){    //不合法
                this.body = 'wrong';
                return false;
            }else{
                var data = yield getRawBody(this.req,{      //获取post得到的xml数据
                    length: this.length,
                    limit:'1mb',
                    encoding:this.charset
                })
                var content = yield util.parseXMLAsync(data);   //解析xml文件
                console.log(content);
                var message = util.formatMessage(content.xml)  //格式化xml数据
                console.log(message);
                // if(message.msgType === 'event'){
                //     if(message.Event === 'subscribe'){
                //         var now = new Date().getTime();
                //
                //         that.status = 200;
                //         that.type = 'application/xml';
                //         var reply =
                //         //     '<xml>
                //         //     <ToUserName><![CDATA[toUser]]></ToUserName>
                //         //     <FromUserName><![CDATA[fromUser]]></FromUserName>
                //         //     <CreateTime>1348831860</CreateTime>
                //         //     <MsgType><![CDATA[text]]></MsgType>
                //         //     <Content><![CDATA[this is a test]]></Content>
                //         // <MsgId>1234567890123456</MsgId>
                //         // </xml>'
                //         console.log(reply);
                //         that.body = reply;
                //     }
                // }
            }
        }
    }
};
