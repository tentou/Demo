/**
 * Created by 58 on 2016/12/20.
 */
// function* foo(x) {
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     return (x + y + z);
// }
//
// var a = foo(5);
 // Object{value:6, done:false}
// a.next() // Object{value:NaN, done:false}
// a.next() // Object{value:NaN, done:true}
//console.log(a.next())
// var b = foo(5);
// b.next() // { value:6, done:false }
// b.next(12) // { value:8, done:false }
// b.next(13) // { value:42, done:true }

// function* foo() {
//     yield 'a';
//     yield 'b';
// }
//
// function* bar() {
//     yield 'x';
//     foo();
//     yield 'y';
// }
//
// for (let v of bar()){
//     console.log(v);
// }

co(function* () {
    var res = yield [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
    ];
    console.log(res); // => [1, 2, 3]
}).catch(onerror);
