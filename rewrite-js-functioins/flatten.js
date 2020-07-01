function flatten(arr) {
  return arr.reduce((acc, curr) => {
    const nextAcc = acc.concat(Array.isArray(curr) ? flatten(curr) : [curr])
    return nextAcc;
  }, [])
}