/**
 * Created by zhangpeng on 2016/4/12.
 */
//------判断一个数组中是否有相同的元素,如果有的话删除相同的元素
var arrs = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, '1', 2, 3, 4, 5];
//1.遍历数组法
var arrsTemp = [];
len = arrs.length;
for (i = len; i--;) {
    if(arrsTemp.indexOf(arrs[i]) == -1){
        arrsTemp.push(arrs[i])
    }
}
//console.log(arrsTemp);

//2.对象键值对法
//下边这个方法不好
var obj = {};
for(i=len;i--;){
    obj[arrs[i]] = typeof arrs[i];
}
var subArr = [];
for(x in obj){
    subArr.push(x)
}
console.log(subArr);

//3.数组下标法
