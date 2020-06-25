Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw TypeError('Error');
    }
    const preArgs = [...arguments].slice(1);
    const _this = this;
    return function resultFunc(...newArgs) {
        if (this instanceof resultFunc) {   // 使用 new 实例化的情况
            return new _this(...preArgs, newArgs);
        }
        return _this.apply(context, [...preArgs, ...newArgs]);
    }

}
