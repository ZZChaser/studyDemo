

const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

class MyPromise {

    state = PENDING;   // 记录当前状态
    value = null;    // 记录 FULFILLED 时， 调用onfulfill的参数
    reason = null;   // 失败时的据因

    onFulfilledCallbacks = [];   // FULFILLED的回调函数
    onRejectedCallbacks = []; // REJECTED 的回调函数

    constructor(fn) {
        try {
            fn(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    resolve = (value) => {
        if (value instanceof MyPromise) {  // todo  ??? 
            return value.then(this.resolve, this.reject);
        }
        setTimeout(() => {  // 规范说明 resolve 和 reject 中的需要异步，保证执行顺序（then的回调都添加上）
            if (this.state === PENDING) {  // 状态只能 PENDING => FULFILLED 或  PENDING => REJECTED
                this.state = FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn(this.value))
            }
        }, 0);

    }

    reject = (error) => {
        setTimeout(() => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = error;
                this.onRejectedCallbacks.forEach(fn => fn(this.reason))
            }
        }, 0);

    }


    then = (onFulfilled, onRejected) => {
        if (this.state === PENDING) {  // PENDING 状态 才能添加回调
            return MyPromise((resolve, reject) => {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const x = onFulfilled(this.value);
                        // todo
                    } catch (error) {
                        reject(error);
                    }
                })

                this.onRejectedCallbacks.push(() => {
                    try {
                        const x = onRejected(this.value);
                        // todo
                    } catch (error) {
                        reject(error);
                    }
                })
            })

        } else if (this.state === FULFILLED) {
            onFulfilled(this.value);
        } else {
            onRejected(this.reason);
        }
    }

}