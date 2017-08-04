function decRtnUndefined(target) {
    target.isDog = true;
}

function decRtnNumberZero(target) {
    target.isDog = true;

    return 0;
}

function decRtnEmptyString(target) {
    target.isDog = true;

    return '';
}

function decRtnFalse(target) {
    target.isDog = true;

    return false;
}

function decRtnNull(target) {
    target.isDog = true;

    return null;
}

function decRtnNaN(target) {
    target.isDog = true;

    return NaN;
}

function decRtnNumber(target) {
    target.isDog = true;

    return 1;
}

function decRtnString(target) {
    target.isDog = true;

    return 'string';
}

function decRtnBoolean(target) {
    target.isDog = true;

    return true;
}

function decRtnObj(target) {
    target.isDog = true;

    const obj = { isObj: true };
    return obj;
}

function decRtnFn(target) {
    target.isDog = true;

    function Cat() {}
    Cat.isCat = true;

    return Cat;
}

function decRtnClass(target) {
    target.isDog = true;

    class Cat {}
    Cat.isCat = true;

    return Cat;
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

const fnArrFalse = [decRtnUndefined, decRtnNumberZero, decRtnEmptyString, decRtnFalse, decRtnNull, decRtnNaN];
const fnArrTrue = [decRtnNumber, decRtnString, decRtnBoolean, decRtnObj, decRtnFn, decRtnClass];
fnArrFalse.forEach(dec => decOperator(dec));
fnArrTrue.forEach(dec => decOperator(dec));

/* 上述代码返回值为
 * decorator.name     Dog                Dog.isDog            Dog.isCat            Dog.isObj
 *
 * decRtnUndefined    class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnNumberZero   class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnEmptyString  class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnFalse        class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnNull         class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnNaN          class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * 
 * decRtnNumber       1                  Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnString       string             Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnBoolean      true               Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * decRtnObj          { isObj: true }    Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=true
 * decRtnClass        class Cat {}       Dog.isDog=undefined  Dog.isCat=true       Dog.isObj=undefined
 * decRtnFn           function Cat() {}  Dog.isDog=undefined  Dog.isCat=true       Dog.isObj=undefined
 * 
 * 由以上结果可知，@decorator class A { }
 * 1. 装饰器返回值为假值时(假值有6种: null, 0, NaN, undefined, '', false)，则A的值不会变，代码效果如下
 *    decorator(A);
 * 2. 装饰器返回值为真值时，不论是数字，字符串，函数，对象还是类，则A的值会被替换为返回的值，代码效果如下
 *    A = decorator(A);
 *
 *  装饰器逻辑翻译为代码如下，若B为假值，什么都不做，若B为真值，将返回值付给A(A必须为class，若为普通函数会报错)
 *  if (B = decorator(A)) A = B;
 */