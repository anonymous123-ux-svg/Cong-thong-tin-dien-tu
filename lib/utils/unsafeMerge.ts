// WARNING: This utility is specifically designed for the React2Shell training lab.
// DO NOT USE IN PRODUCTION. It intentionally lacks sanitization for Prototype Pollution.

export function deepMerge(target: any, source: any): any {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  for (const key in source) {
    // VULNERABILITY: Intentionally missing check for __proto__, constructor, or prototype
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
