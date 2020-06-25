// https://leetcode-cn.com/problems/3sum/
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。


function threeSum(nums) {

  const sortedNums = nums.sort((a, b) => a - b); // 排序
  const len = sortedNums.length;
  const endArr = [];
  for(let i = 0; i < len - 2; i++) {
      const item = sortedNums[i];
      const sum = 0 - item;

      let left = i + 1;
      let right = len - 1;

      if (item === sortedNums[i - 1]) { // 相同项跳过
          continue;
      }

      while (left < right) {
          const twoSum = sortedNums[left] + sortedNums[right];
          if (twoSum < sum) {
              left++;
              while(sortedNums[left] === sortedNums[left - 1]) {  // 相同项跳过
                  left++;
              }
          } else if (twoSum > sum) {
              right--;
              while(sortedNums[right] === sortedNums[right + 1]) {  // 相同项跳过
                  right--;
              }
          } else {
              endArr.push([item, sortedNums[left], sortedNums[right]]) // 记录满足的情况
              left++;
              right--;
              // 相同项跳过
              while(sortedNums[left] === sortedNums[left - 1]) {
                  left++;
              }
              while(sortedNums[right] === sortedNums[right + 1]) {
                  right--;
              }
          }

      }
  }

  return endArr;
};