/**
 * 中间件--验证Token
 * access_token 是票据
 * Created by tentou on 2016/9/5.
 */

var sha1 = require('sha1');

module.exports = function(opts){
    return function *(next) {
        console.log(this.query);  //URL上带的？后边的键值对

        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token,timestamp,nonce].sort().join('');
        var sha = sha1(str);

        if(sha === signature){
            this.body = echostr + '';
        }else{
            this.body = 'wrong';
        }
    }
}
