// export const newStuff = () => {
//   console.log("i am new in this town");
// };

// export const newStuff2 = () => {
//   console.log("i am new in this town 2");
// };

export const cpyObj = <T>(obj: T): T => {
  if (typeof obj !== "object" || obj === null) return obj;
  if (typeof obj === "function") return obj;

  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as T;

  if (obj instanceof Set) {
    const res = new Set();
    obj.forEach((v) => res.add(cpyObj(v)));
    return res as T;
  }
  if (obj instanceof Map) {
    const res = new Map();
    obj.forEach((v, k) => res.set(cpyObj(k), cpyObj(v)));
    return res as T;
  }

  if (Array.isArray(obj)) return obj.map(cpyObj) as T;

  const cpy: T = {} as { [K in keyof T]: T[K] };

  for (const k in obj)
    if (Object.prototype.hasOwnProperty.call(obj, k)) cpy[k] = cpyObj(obj[k]);

  return cpy;
};
