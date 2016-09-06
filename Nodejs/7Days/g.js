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
                console.log("get对")

                this.body = echostr + '';
            }else{
                console.log("get不对")
                this.body = 'wrong';
            }
        }else if(this.method === 'POST'){
            if(sha !== signature){    //不合法
                console.log("post不对")
                this.body = 'wrong';
                return false;
            }else{
                console.log("post对")
                var data = yield getRawBody(this.req,{      //获取post得到的xml数据
                    length: this.length,
                    limit:'1mb',
                    encoding:this.charset
                })
                var content = yield util.parseXMLAsync(data);   //解析xml文件
                console.log(content);
                var message = util.formatMessage(content.xml)  //格式化xml数据
                console.log(message);
                if(message.MsgType === 'event'){  //如果是一个event，说明push过来的是一个事件
                    if(message.Event === 'subscribe'){      //如果是subscribe（订阅事件）
                        var now = new Date().getTime();

                        that.status = 200;    //回复状态
                        that.type = 'application/xml';      //回复类型
                        var reply =                         //要回复的内容，必须是xml格式
                            '<xml>'+
                            '<ToUserName><![CDATA['+ message.FromUserName +']]></ToUserName>'+
                            '<FromUserName><![CDATA['+ message.ToUserName +']]></FromUserName>'+
                            '<CreateTime>'+ now +'</CreateTime>'+
                            '<MsgType><![CDATA[text]]></MsgType>'+
                            '<Content><![CDATA[Hi im zhp]]></Content>'+    //这里的Hi im zhp是当我关注这个公众号后自动回复的内容
                            '</xml>'
                        console.log(reply);
                        that.body = reply;
                        return;
                    }
                }
            }
        }
    }
};
