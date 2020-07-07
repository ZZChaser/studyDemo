//  https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/

// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {


  if (!n) { return head; };

  const dummy = new ListNode();
  dummy.next = head;
  let pre = dummy;
  let after = dummy;
  let i = 0;

  while(after.next) {
      if (i < n) {
          i++;
          after = after.next;
      } else {
          after = after.next;
          pre = pre.next
      }
  }
  pre.next = pre.next.next;

  return dummy.next
};