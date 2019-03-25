export default function $bind(context = null, ...curryArgs) {
  const _self = this;
  return function bindFunc(...args) {
    context.fn = _self;
    const result = context.fn(...curryArgs.concat(args));
    delete context.fn;
    // Reflect.deleteProperty(context,fn)
    return result;
  };
}
