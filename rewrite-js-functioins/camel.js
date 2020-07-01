function camel(obj) {
  const result = {};
  if(typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      result[parseString(key)] = value;
    }
    return result;
  }
  return obj;
}

function parseString(str) {
  // replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用
  return str.replace(/\_\w/g, v => v.replace(/\_/, '').toUpperCase());
}