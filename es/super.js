/* 建立class时，当且仅当“使用了extends关键字并指定了constructor函数”，super关键字必须以super([arg1[, arg2...  argN]])
 * 的形式使用一次。此时super([arg1[, arg2...  argN]])相当于创建了一个对象，且以该对象为context调用extends关键字指示的函
 * 数（以new的形式），随后这个对象成为constructor函数的context。因此super([arg1[, arg2...  argN]])必须出现在constructor
 * 函数内的第一个this关键字之前，否则会报“this is not defined”的ReferenceError。亦可以super . IdentifierName的形式出现
 * （这就与是否使用了extends关键字无关了）。super.IdentifierName作为getter使用时，表示函数B的prototype属性对象的[[prototype]]；
 * super.IdentifierName作为setter使用时，super表示this
 *
 * class B extends A
 * B.prototype.__proto__ = A.prototype 原型继承
 * B.__proto__ = A 静态变量继承
 */

class A {
    static staticMethodA(arg) {}

    method() {}
}

class B extends A {
    static staticMethodB(arg) {
        super.staticMethodA(arg);  // 等同于A.staticMethodA.call(this, arg)
        // ...
    }

    constructor(value) {
        super();  // this由super产生，所以必须在使用this之前调用super
        this.value = value;
    }

    method(arg) {
        super.method(arg);  // 等同于A.prototype.method.call(this, arg)
        // ...
    }
}