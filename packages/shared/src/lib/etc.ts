// export const newStuff = () => {
//   console.log("i am new in this town");
// };

// export const newStuff2 = () => {
//   console.log("i am new in this town 2");
// };

export const cpyObj = <T>(obj: T): T => {
  if (typeof obj !== "object" || obj === null) return obj;

  if (obj instanceof Date) return new Date(obj.getTime()) as T;

  if (Array.isArray(obj)) return obj.map(cpyObj) as T;

  const cpy: T = {} as { [K in keyof T]: T[K] };

  for (const k in obj)
    if (Object.prototype.hasOwnProperty.call(obj, k)) cpy[k] = cpyObj(obj[k]);

  return cpy;
};
