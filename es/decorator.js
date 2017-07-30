function decRtnUndefined(target) {
    target.isDog = true;
}

function decRtnNumber(target) {
    target.isDog = true;

    return 1;
}

function decRtnString(target) {
    target.isDog = true;

    return 'String';
}

function decRtnClass(target) {
    target.isDog = true;

    class Cat {}
    Cat.isCat = true;

    return Cat;
}

function decRtnFn(target) {
    target.isDog = true;

    function Cat() {}
    Cat.isCat = true;

    return Cat;
}


function decRtnObj(target) {
    target.isDog = true;

    const obj = { isObj: true };
    return obj;
}
/* @decorator
 * function Dog() {}
 * 装饰器不能作用于函数(不是类中的方法，作用于类的中的方法是可以的)，会报错
 */

function decOperator(decorator) {
    @decorator
    class Dog {}

    console.log(decorator.name, Dog, `Dog.isDog=${Dog.isDog}`, `Dog.isCat=${Dog.isCat}`, `Dog.isObj=${Dog.isObj}`);
}

[decRtnUndefined, decRtnNumber, decRtnString, decRtnClass, decRtnFn, decRtnObj].forEach(dec => decOperator(dec));

/* 上述代码返回值为
 * decorator.name  Dog                Dog.isDog            Dog.isCat            Dog.isObj
 *
 * decRtnUndefined class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnNumber    1                  Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnString    String             Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnClass     class Cat {}       Dog.isDog=undefined  Dog.isCat=true       Dog.isObj=undefined
 * decRtnFn        function Cat() {}  Dog.isDog=undefined  Dog.isCat=true       Dog.isObj=undefined
 * decRtnObj       { isObj: true }    Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=true
 *
 * 由以上结果可知，@decorator class A { }
 * 1. 装饰器返回值为undefined时，则A的值不会变，代码效果如下
 *    decorator(A);
 * 2. 装饰器有返回值时，不论是数字，字符串，函数，对象还是类，则A的值会被替换为返回的值，代码效果如下
 *    A = decorator(A);
 *
 *  装饰器逻辑翻译为代码为 if (B = decorator(A)) A = B;
 */