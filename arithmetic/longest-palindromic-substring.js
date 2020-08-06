
// https://leetcode-cn.com/problems/longest-palindromic-substring/

// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {

    const len = s.length;
    let dp = [];

    for (let i = 0; i < len; i++) {
        dp[i] = [];
    }
    let left = 0;
    let right = 0;


    // 一个字符时为回文
    for (let i = 0; i < len; i++) {
        dp[i][i] = 1;
    }

    // 两个字符的情况
    for (let i = 0; i < len - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = 1;
            left = i;
            right = i + 1;
        }
    }

    // n为子串长度
    for (let n = 3; n <= len; n++) {
        for (let i = 0; i <= len - n; i++) {
            const j = i + n - 1;
            if (dp[i + 1][j - 1]) {
                if (s[i] === s[j]) {
                    dp[i][j] = 1;
                    left = i;
                    right = j;
                }
            }
        }
    }

    return s.substring(left, right + 1);

};