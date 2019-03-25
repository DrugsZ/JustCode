export default function $call(context = null, args) {
  context.fn = this;

  const result = context.fn(...args);

  // Reflect.deleteProperty(context,fn)
  delete context.fn;
  return result;
}
