/**
 * Created by zhangpeng on 2016/4/19.
 */
var url = 'http://web.jobbole.com/85156?name=zhangpeng&age=18'
function parseUrl(url){
    var urlNew = url.substring(url.lastIndexOf("?")+1)   //substring包括开始位置，所以+1
    var urlCurrent = decodeURIComponent(urlNew);
    var obj = {};
    var reg = /([^?&]+)=([^&]*)/ig;
    //方法一
    // urlCurrent.replace(reg,function(aa,$1,$2){
    //     obj[$1] = $2;
    //     return aa;
    // })
    //方法二
    var arr = urlCurrent.match(reg);
    var arrLength = arr.length;
    for(var i = arr.length;i--;){
        var subArr = arr[i].split("=");
        obj[subArr[0]] = subArr[1];
    }
    console.log(obj)
}
parseUrl(url);

