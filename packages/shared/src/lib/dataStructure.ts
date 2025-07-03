export const isStr = (val?: string | null): boolean =>
  typeof val === "string" && !!val.trim().length;

export const isArrOK = <T>(arg: T[], cb?: (val: T) => boolean): boolean =>
  Array.isArray(arg) &&
  !!arg.length &&
  arg.every(typeof cb === "function" ? cb : Boolean);

export const isIs = <T extends Record<string, string>>(obj: T, val: keyof T) =>
  Object.keys(obj).includes(val as string);

export const isObjOK = <T>(
  arg: T,
  cb?: (val: T[keyof T]) => boolean,
): boolean =>
  typeof arg === "object" &&
  arg !== null &&
  !Array.isArray(arg) &&
  !!Object.keys(arg).length &&
  Object.values(arg).every((val) =>
    typeof cb === "function" ? cb(val) : true,
  );
