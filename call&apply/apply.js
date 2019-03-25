export default function $apply(context = null, args) {
  context.fn = this;
  const isArray = Array.isArray(args);

  if (!isArray) {
    console.error(new TypeError('CreateListFromArrayLike called on non-object'));
    return;
  }
  const result = context.fn(...args);

  // Reflect.deleteProperty(context,fn)
  delete context.fn;
  return result;
}
