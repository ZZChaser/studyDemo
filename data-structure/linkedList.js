class LinkedNode {
  value;
  next;
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  head;
  size;
  constructor() {
    this.head = new LinkedNode(null, null);
  }

  find(index) {
    this._checkIndex(index);
    let i = index + 1;
    let node = this.head;

    while (i) {
      node = node.next;
      i -= 1;
    }

    return node;
  }

  addNode(v, index) {
    const preNode = this.find(index);
    const addNode = new LinkedNode(v, preNode.next);
    preNode.next = addNode;
    this.size += 1; 
    return preNode.next;
  }

  deleteNode(index) {
    if (!index) {  // 删除头结点
      this.head = this.head.next;
      this.size -= 1;
    } else {
      const preNode = this.find(index - 1);
      const deleteNode = preNode.next;
      preNode.next = deleteNode.next;
      deleteNode.next = null;
      this.size -= 1;
    }
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  _checkIndex(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index error')
    }
  }

}