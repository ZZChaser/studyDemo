
Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {   // 判断是否为函数调用
        throw TypeError('Error');
    }
    const targetContext = context || window;   // 
    targetContext.fn = this;
    const args = [...arguments].slice(1);
    const result = targetContext.fn(...args);
    delete targetContext.fn;
    return result;
}