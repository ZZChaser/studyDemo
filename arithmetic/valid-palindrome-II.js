
// https://leetcode-cn.com/problems/valid-palindrome-ii/

// 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

function validPalindrome(s) {

  const len = s.length;
  let left = 0;
  let right = len - 1;

  while(left < right && s[left] === s[right]) {
      left++;
      right--;
  }

  function isPalindroma(a, b) {
      while(a < b) {
          if(s[a] !== s[b]) {
              return false;
          }
          a++;
          b--;
      }
      return true;
  }
  return left === right || isPalindroma(left + 1, right) || isPalindroma(left, right - 1)
};