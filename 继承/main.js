/**
 * Created by zhangpeng on 2016/4/26.
 */
/*
* 原型链       prototype
* 借用构造函数  apply/call
* 原型式       Object.create()
* 浅复制
* 深复制
* 寄生组合式继承 原型链+借用构造函数+原型式
* */
//原型式继承--浅复制 可以用Object.create()代替
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
//原型链继承--下边这个和（组合技成中的）SubType.prototype = new SuperType();的作用相同，但是下边这么写的意思是为了避免多次创建SuperType()的实例
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype);   //prototype.prototype == superType.prototype
    prototype.constructor = subType;               //augment object
    subType.prototype = prototype;                 //subType.prototype.prototype == superType.prototype
}
//父对象/父类/超类-的属性
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
//超类的方法写在原型上
SuperType.prototype.sayName = function(){
    alert(this.name);
};
//借用构造函数-SubType本身指向Super,拥有了colors属性。SubType原型也指向了SuperType的原型，但后边会被重写
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
//让SubType的prototype继承SuperType，使得之前SubType的prototype被覆盖
inheritPrototype(SubType, SuperType);
//一定要在上边重写SubType的prototype被重写之后再定义方法，否则会被覆盖
SubType.prototype.sayAge = function(){
    alert(this.age);
};
//运用
//先创建一个实例副本，是副本副本副本（副本会复制本身，但是不会复制原型链）
var instance1 = new SubType("Nicholas", 29);
//这样修改的就是副本本身，而不是原型链了
instance1.colors.push("black");
alert(instance1.colors);  //"red,blue,green,black"
//再创建一个新副本，新副本是从SubType本身复制过来的，不是从其他副本复制过来的
var instance2 = new SubType("Greg", 27);
alert(instance2.colors);  //"red,blue,green"

