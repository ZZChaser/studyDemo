//  https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {

    function buildRoot(preLeft, preRight, inLeft, inRight) {

        if (preLeft > preRight || inLeft > inRight) {
            return null;
        }

        const rootValue = preorder[preLeft];
        const root = new TreeNode(rootValue);
        const inIndex = inorder.indexOf(rootValue);
        const leftTreeLen = inIndex - inLeft;

        root.left = buildRoot(preLeft + 1, preLeft + leftTreeLen, inLeft, inIndex - 1);
        root.right = buildRoot(preLeft + leftTreeLen + 1, preRight, inIndex + 1, inRight);

        return root;
    }


    return buildRoot(0, preorder.length - 1, 0, inorder.length - 1);

};