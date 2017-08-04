/* @decorator
 * function Dog() {}
 * 装饰器不能作用于函数(不是类中的方法，作用于类的中的方法是可以的)，会报错
 */

const obj = { isObj: true };

class Cat {
    static isCat = true;
}

function cat() { }
cat.isCat = true;

function decGenerator (rtnVal) {
    return function (target) {
        target.isDog = true;

        return rtnVal;
    }
}

const falseVal = [ 0, NaN, null, undefined, '', false ];
const trueVal = [ 1, 'string', true, obj, cat, Cat ];

const falseFn = falseVal.map(decGenerator);
const trueFn = trueVal.map(decGenerator);

function decOperator(decorator) {
    @decorator
    class Dog {}

    console.log(Dog, `Dog.isDog=${Dog.isDog}`, `Dog.isCat=${Dog.isCat}`, `Dog.isObj=${Dog.isObj}`);
}

falseFn.forEach(dec => decOperator(dec));
trueFn.forEach(dec => decOperator(dec));

/* 上述代码返回值为
 * Dog                Dog.isDog            Dog.isCat            Dog.isObj
 *
 * class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * class Dog {}       Dog.isDog=true       Dog.isCat=undefined  Dog.isObj=undefined
 * 
 * 1                  Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * string             Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * true               Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=undefined
 * { isObj: true }    Dog.isDog=undefined  Dog.isCat=undefined  Dog.isObj=true
 * class Cat {}       Dog.isDog=undefined  Dog.isCat=true       Dog.isObj=undefined
 * function cat() {}  Dog.isDog=undefined  Dog.isCat=true       Dog.isObj=undefined
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