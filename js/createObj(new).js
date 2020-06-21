function createObj() {
    const Func = arguments[0];
    if (typeof Func !== 'function' || !Func.prototype) {  // 箭头函数没有原型
        throw Error('参数错误');
    }
    const obj = {};
    obj.__proto__ = Func.prototype;   // 设置对象原型
    const result = Fun.apply(obj, [...arguments].slice(1));  // 执行构造函数
    return result instanceof Object ? result : obj;  // 确保返回值是对象
}