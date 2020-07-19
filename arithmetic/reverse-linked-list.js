

// https://leetcode-cn.com/problems/reverse-linked-list/
// Reverse a singly linked list.


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {

  let pre = null;
  let cur = head;

  while(cur !== null) {
      const next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
  };

  return pre;
};