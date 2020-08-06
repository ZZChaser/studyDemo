
// https://www.ituring.com.cn/article/66566   promise A+ 规范

const PENDING = 'Pending'
const FULFILLED = 'Fulfilled'
const REJECTED = 'Rejected'

class MyPromise {
  state = PENDING // 记录当前状态
  value = null // 记录 FULFILLED 时， 调用onfulfill的参数
  reason = null // 失败时的据因

  onFulfilledCallbacks = [] // FULFILLED的回调函数
  onRejectedCallbacks = [] // REJECTED 的回调函数

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve = (value) => {
    if (value instanceof MyPromise) {
      // todo  ???
      return value.then(this.resolve, this.reject)
    }
    setTimeout(() => {
      // 规范说明 resolve 和 reject 中的需要异步，保证执行顺序（then的回调都添加上）
      if (this.state === PENDING) {
        // 状态只能 PENDING => FULFILLED 或  PENDING => REJECTED
        this.state = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value))
      }
    }, 0)
  }

  reject = (error) => {
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = error
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason))
      }
    }, 0)
  }

  then = (onFulfilled, onRejected) => {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === PENDING) {
        // PENDING 状态 才能添加回调
        this.onFulfilledCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolutionProcedure(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason)
            this.resolutionProcedure(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolutionProcedure(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this.resolutionProcedure(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
    })

    return promise2
  }

  resolutionProcedure = (promise2, x, resolve, reject) => {
    //   判断是否出现循环引用
      if (promise2 === x) {
          return reject(new Error('出现循环引用'));
      }
    //   判断是否是promise
    if (x instanceof MyPromise) {
        x.then(data => {
            this.resolutionProcedure(promise2, data, resolve, reject);
        })
    }
    let called = false;

    if (typeof x === 'object' || typeof x === 'function') {
        try {
            const { then } = x;
            if (typeof then === 'function') {
                then.call(x, (v => {
                    if (called) {
                        return;
                    }
                    called = true;
                    this.resolutionProcedure(promise2, v, resolve, reject)
                }, r => {
                    if (called) {
                        return;
                    }
                    called = true;
                    reject(r);
                }))
            } else {
                resolve(x);
            }
        } catch (error) {
            
        }
    } else {
        resolve(x);
    }
  }
}
