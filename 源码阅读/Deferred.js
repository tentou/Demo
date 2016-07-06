/**
 * Created by tentou on 2016/7/5.
 */
// jQuery. Deferred主要处理：
//     显而易见Deferred是个工厂类，返回的是内部构建的deferred对象
//     tuples 创建三个$.Callbacks对象，分别表示成功，失败，处理中三种状态
//     创建了一个promise对象，具有state、always、then、primise方法
//     扩展primise对象生成最终的Deferred对象，返回该对象
//     primise对象就是一个受限对象，只读
var Deferred = function(func) {
    var tuples = [
            //1 动作
            //2 侦听器
            //3 最终状态
            //后面的操作将是围绕这些接口处理
            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
            ["notify", "progress", jQuery.Callbacks("memory")]
        ],
        state = "pending",
    //扩展的primise对象
        promise = {
            state: function() {},
            always: function() {},
            then: function( /* fnDone, fnFail, fnProgress */ ) {},
            promise: function(obj) {}
        },
        deferred = {};
    //定义管道风格的接口pipe
    promise.pipe = promise.then;
    //逐个添加所有的接口到deferred对象上
    jQuery.each(tuples, function(i, tuple) {
        deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
            return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
    });
    //转成成promise对象
    promise.promise(deferred);
    //如果传递的参数是函数，直接运行
    if (func) {
        func.call(deferred, deferred);
    }
    return deferred;
};

//when就是一个合集的处理
//可以收集多个异步操作，合并成功后处理
//同时也可以绑定Promise 对象的其它方法，如 defered.then
//所以when内部必须要创建一个deferred对象
var when = function(subordinate /* , ..., subordinateN */ ) {
    var i = 0,
        resolveValues = slice.call(arguments),
        length = resolveValues.length,
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        updateFunc = function(i, contexts, values) {
            return function(value) {};
        },
        progressValues, progressContexts, resolveContexts;
    if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
            if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                resolveValues[i].promise()
                    .done(updateFunc(i, resolveContexts, resolveValues))
                    .fail(deferred.reject)
                    .progress(updateFunc(i, progressContexts, progressValues));
            } else {
                --remaining;
            }
        }
    }
    return deferred.promise();
};
