/**
 * 
 * @param {Object} obj 要获取层级的对象
 * @return {Number}
 */
const getObjectLevel = (obj) => {
  let current = [obj];
  let other = [];
  let i = 0;

  while (current.length) {
    i++;
    for (let k of current) {
      if(Array.isArray(k)){
        other = other.concat(k);
      }else{
        Object.keys(k).forEach(key => other.push(k[key]))
      }
    }
    current = other;
    other.length = 0;
  }

  return i
}