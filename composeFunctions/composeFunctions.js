/**
 *
 * @param  {...any} cbs 函数累加调用
 */


// const add = x => x + 1;
// const multiply = (x, y) => x * y;
// const multiplyAdd = composeFunctions(multiply, add);
// console.log(multiplyAdd(3, 4)); // 返回 13


const composeFunctions = (...cbs) => (...args) => {
  let result = args;
  cbs.forEach((cb) => {
    result = Reflect.apply(cb, null, result);
    result = [result];
  }, this);
  return result[0];
};

export default {
  composeFunctions,
};
