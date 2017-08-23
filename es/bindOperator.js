// ES7 绑定操作符 ::， obj::fn(arg)，则fn中的this指向obj，并调用fn，等同于fn.call(obj, arg)
// 写法类似于obj.fn，只不过fn为obj原型对象上或为obj对象下的一个方法

function map(f) {
    const mapped = new Array(this.length);

    for (let i = 0; i < this.length; i++)
        mapped[i] = f(this[i], i);
    
    return mapped;
}

const result = [1, 2, 3]::map(v => v ** 3);  // 等同于map.call([1,2,3], v => v ** 3);
const res = { 0: 0, 1: 1, 2: 2, length: 3 }::map(v => v * 2);
console.log(res);