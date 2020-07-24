
const handler = {
    get: function (target, key, receiver) {
      console.log({target, key, receiver});
      
      return 7;
    },
    set: function (target, key, value, receiver) {
      console.log({target, key, value, receiver});
      
    }
  }

const obj = new Proxy({}, handler)