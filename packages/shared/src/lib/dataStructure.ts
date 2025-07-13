import { StackType, TechPkg, TechValType } from "../constants/categories.js";
import { __cg } from "./logger.js";

export const isStr = (val?: string | null): boolean =>
  typeof val === "string" && !!val.trim().length;

export const isArrOK = <T>(
  arg?: T[] | null,
  cb?: (val: T) => boolean,
): boolean =>
  Array.isArray(arg) &&
  !!arg.length &&
  arg.every((el) => (typeof cb === "function" ? cb(el) : true));

export const isInObjKeys = <T extends Record<string, any>>(
  obj: T,
  val: keyof T,
) => Object.keys(obj).includes(val as string);

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

export const grabValidTechs = (stack: StackType) => {
  const filtered = Object.fromEntries(
    Object.entries(TechPkg).filter(([_, v]) => v.stack === stack),
  );

  return {
    filtered,
  };
};
export const isValidTech = (val: TechValType, stack: StackType) => {
  const { filtered } = grabValidTechs(stack);

  return isInObjKeys(filtered, val);
};

export const isStrBool = (v: string) => ["true", "false"].includes(v);

export const isJsObj = (obj: unknown) =>
  typeof obj === "object" && obj !== null;
