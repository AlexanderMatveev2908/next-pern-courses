// export const newStuff = () => {
//   console.log("i am new in this town");
// };

import { SafeParseReturnType, ZodTypeAny } from "zod";
import { TechPkg } from "@shared/first/constants/categories.js";

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

const isObj = (val: unknown): val is object =>
  typeof val === "object" && val !== null;

export const isSameObj = <T>(obj1: T, obj2: T): boolean => {
  if (obj1 === obj2) return true;

  if (isObj(obj1) !== isObj(obj2)) return false;

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  if (Array.isArray(obj1)) {
    if (obj1.length !== (obj2 as T[]).length) return false;
    // here check each item for item, like item1_a to item2_a, then item1_b to item2_b and so on
    return obj1.every((el, i) => isSameObj(el, (obj2 as T[])[i]));
  }

  const keys1 = Object.keys(obj1 as {});
  const keys2 = Object.keys(obj2 as {});
  if (keys1.length !== keys2.length) return false;

  // same as for array but no index, instead just key for key for each object until the smallest type of val( i mean primitive for small )
  if (!keys1.every((key) => keys2.includes(key))) return false;
  return keys1.every((key) =>
    isSameObj((obj1 as T)[key as keyof T], (obj2 as T)[key as keyof T]),
  );
};

export const grabErrMsgZOD = <T extends ZodTypeAny>(
  result: SafeParseReturnType<unknown, T>,
) => {
  const fancyErrsList = result!.error!.format();
  const msg =
    fancyErrsList._errors[0] ??
    Object.values(fancyErrsList)
      .flatMap((errs) => (errs as any)?._errors)
      .filter(Boolean)[0];

  return {
    msg,
    fancyErrsList,
  };
};

export const genIpsum = (num: number = 1) =>
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ea amet consectetur soluta, veritatis iste, at repudiandae praesentium esse nihil eaque maiores facilis ad! Alias eveniet maiores illum obcaecati perferendis!`.repeat(
    num,
  );

// ? i use just for making me a general idea of a real text length
export const extractLoremCount = (txt: string) =>
  txt.length / genIpsum().length;

export const parseTechObj = (techObj: typeof TechPkg) =>
  Object.fromEntries(Object.entries(techObj).map(([k, v]) => [[k], v.label]));

export const boolObj = {
  true: true,
  false: false,
};
