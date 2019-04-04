Array.prototype._map = function _map(cb) {
  const result = this.reduce((acc, item, index, array) => {
    acc.push(Reflect.apply(cb, this, [item, index, array]));

    return acc;
  }, []);

  return result;
};
