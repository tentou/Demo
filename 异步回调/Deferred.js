/*
*  模拟Deferred的when方法
*  利用了观察者模式
* */

$('button').eq(0).click(function() {
    var d1 = new $.Deferred();
    var d2 = new $.Deferred();

    setTimeout(function(){
        d1.resolve("$.when代码测试Fish");
    },500)

    setTimeout(function(){
        d2.resolve("$.when代码测试Pizza");
    },1000)

    $.when(d1, d2).done(function(v1, v2) {
        show(v1); // "Fish"
        show(v2); // "Pizza"
    });
})



$('button').eq(1).click(function() {

    var d1 = new $.Deferred();
    var d2 = new $.Deferred();

    setTimeout(function() {
        d1.resolve("when模拟:Fish");
    }, 500)

    setTimeout(function() {
        d2.resolve("when模拟:Pizza");
    }, 1000)

    function when(d1, d2) {
        var i = 0,
            resolveValues = [].slice.call(arguments),
            length = resolveValues.length;
        var len = length;
        //收集resolve值
        var values = [];
        var deferred = jQuery.Deferred();

        function updateFunc(value) {
            values.push(value);
            if (len === 1) {
                deferred.resolveWith('contexts', values);
            }
            len--
        }
        for (; i < length; i++) {
            resolveValues[i].done(updateFunc)
        }
        return deferred;
    }

    when(d1, d2).done(function(v1, v2) {
        show(v1); // "Fish"
        show(v2); // "Pizza"
    });

})
