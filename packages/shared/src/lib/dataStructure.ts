export const isStr = (val?: string | null): boolean =>
  typeof val === "string" && !!val.trim().length;

export const isArrOK = <T>(arg: T[], cb?: (val: T) => boolean): boolean =>
  Array.isArray(arg) &&
  !!arg.length &&
  arg.every(typeof cb === "function" ? cb : Boolean);
