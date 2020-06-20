Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw TypeError('Error');
    }
    const targetContext = context || window;
    const args = arguments[1] || [];   //  apply 第二个 参数是数组
    targetContext.fn = this;
    const result = targetContext.fn(...args);
    delete targetContext.fn;
    return result;
}
