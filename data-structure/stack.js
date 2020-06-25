class MyStack {
  stack = [];

  push(item) {
    this.stack.push(item);
  }
  pop() {
    if (this.stack.length) {
      return this.stack.pop();
    }
  }
  length() {
    return this.stack.length
  }
  isEmpty() {
    return this.stack.length === 0
  }
}