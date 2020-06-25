class TreeNode {
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
    this.left = this.right = null;
  }
}


// 先序遍历
function preorder(root) {
  if (!root) return;
  const { value, left, right } = root;
  console.log({value});
  preorder(left);
  preorder(right);
}
// 中序遍历
function inorder(root) {
  if (!root) return;
  const { value, left, right } = root;
  inorder(left);
  console.log({value});
  inorder(right);
}
// 后序遍历
function postorder(root) {
  if (!root) return;
  const { value, left, right } = root;
  postorder(left);
  postorder(right);
  console.log({value});
}