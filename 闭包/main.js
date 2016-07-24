/**
 * Created by zhangpeng on 2016/4/27.
 */
var a = (function () {          //必须自执行，要不然返回的是一个函数
    var name = 'zhang';
    return (function (){        //必须自执行，要不然返回的是一个函数
        var name = 'peng';
        return name;
    })();
})();
console.log(a);
