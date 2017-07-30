/* 解构  { a, b, ...rest }为 { a: a, b: b, ...rest }的简写
 * { a: a, b: b, ...rest } = { a: 0, b: 1, c: 2, d: 3, e: 4}
 * 最终a 0，b 1，rest接收剩下的属性变成一个对象 { c: 2, d: 3, e: 4 }
 */
const { a, b, ...rest } = { a: 0, b: 1, c: 2, d: 3, e: 4 };
console.log(a, b, rest);  // 0  1  { c: 2, d: 3, e: 4 }

// 规范现在只实现了展开操作符作用于数组，上面的展开对象还没写入规范
function f(...args) {
    console.log(args.constructor, args);
}

f(1, 2, 3);  // [Function: Array]  [ 1, 2, 3 ]