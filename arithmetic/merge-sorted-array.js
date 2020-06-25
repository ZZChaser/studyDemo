// https://leetcode-cn.com/problems/merge-sorted-array
// 描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

function merge(nums1, m, nums2, n) {
  let k = m + n - 1; // nums1的倒序index
  let a = m - 1;
  let b = n - 1;

  while (a >= 0 && b >= 0) {
    const numa = nums1[a];
    const numb = nums2[b];
    if (numa >= numb) {
      nums1[k] = numa;
      a--;
      k--;
    } else {
      nums1[k] = numb;
      b--;
      k--;
    }
  }

  while (b >= 0) {
    nums1[b] = nums2[b];
    b--;
  }

  return nums1;
}

// js巧方法

function merge(nums1, m, nums2, n) {
  const oriLen = nums1.length;
  nums1.splice(m,0,...nums2);
  nums1 = nums1.sort((a, b) => a - b);
  nums1.splice(0, nums1.length - oriLen);
  return nums1;
}