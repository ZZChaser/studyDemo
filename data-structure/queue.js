class MyQueue {
  queue = [];

  push(item) {
    this.queue.push(item);
  }

  shift() {
    if(this.queue.length) {
      return this.queue.shift();
    }
  }
  length() {
    return this.queue.length;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}