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

//===============================源码解析（上）===================================

function Deferred(){
    //内部deferred对象
    var deferred = {};

    //定义的基本接口
    //Callbacks(once memory)的用法，就是只执行一次，并且保持以前的值
    // 每个元组分别包含一些与当前deferred相关的信息: 
    // 分别是：触发回调函数列表执行(函数名)，添加回调函数（函数名），回调函数列表（jQuery.Callbacks对象），deferred最终状态（第三组数据除外）
    // 总体而言，三个元组会有对应的三个callbacklist对应于doneList, failList, processList
    var tuples = [
        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
        ["notify", "progress", jQuery.Callbacks("memory")]
    ];

    //deferred的状态，三种：pending(初始状态), resolved(解决状态), rejected(拒绝状态)
    //其实就是tuples最后定义的
    var state = "pending";

    //内部promise对象,作用：
    //1：通过promise.promise( deferred );混入到deferred中使用
    //2：可以生成一个受限的deferred对象，
    //   不在拥有resolve(With), reject(With), notify(With)这些能改变deferred对象状态并且执行callbacklist的方法了
    //   换句话只能读，不能改变了
    //扩展
    //  done fail pipe process 
    var promise = {
        state: function() {},
        always: function() {},
        then: function() {},
        promise: function(obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
        }
    };

    //管道接口,API别名
    promise.pipe = promise.then;

    //遍历tuples
    //把定义的接口混入到deferred中
    jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];

        // 给上面的promise对象添加done，fail，process方法
        // 分别引用三个不同 jQuery.Callbacks("once memory")对象的add方法，在初始化就构建成了对象
        // 向各自的回调函数列表list（各自闭包中）中添加回调函数，互不干扰
        // promise = {
        //    done:
        //    fail:
        //    process
        // }
        promise[tuple[1]] = list.add;

        if (stateString) {
            list.add(function() {
                state = stateString;
            }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
            return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
    });
    //混入方法
    promise.promise(deferred);

    return deferred;
}


$("button").on("click", function() {
    var dtd = Deferred();
    // 给deferred注册一个成功后的回调通知
    dtd.done(function() {
        $('body').append('<li>Deferred成功</li>')
    });
    // 开始执行一段代码
    setTimeout(function() {
        dtd.resolve(); // 改变deferred对象的执行状态
    }, 500);
});

//===============================源码解析（下）===================================

