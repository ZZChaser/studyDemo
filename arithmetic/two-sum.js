// 题目地址：https://leetcode-cn.com/problems/two-sum/

// 描述：给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。


function twoSum (nums, target) {
  if (!nums.length) throw new Error('空数组');
  const map = new Map();
  for (let i = nums.length - 1; i > -1; i--) {
    const num = nums[i];
    const diff = target - num;
    if (map.has(diff)) {
      return [i, map.get(diff)];
    }
    map.set(num, i);
  }
  return [];
}