import { FieldArrType, FormFieldType } from "@/common/types/uiFactory";
import { capt } from "@shared/first/lib/formatters";
import { RefObject } from "react";
import { FieldValues, Path } from "react-hook-form";
import { v4 } from "uuid";

export const addID = <T>(arg: T[]): (T & { id: string })[] =>
  arg.map((el) => ({
    ...el,
    id: v4(),
  }));

export const getSomePlaceholder = <T extends FieldValues, K extends Path<T>>(
  el: FormFieldType<T> | FieldArrType<T, K>,
): string => {
  const place = el.place ?? el.label ?? el.name;
  const parsed = capt(place.replace("*", ""));

  return parsed + "...";
};

export const clearT = (ref: RefObject<NodeJS.Timeout | null>) => {
  if (!ref.current) return;

  clearTimeout(ref.current);
  ref.current = null;
};

export const isWindow = () => typeof window !== "undefined";

export const genIpsum = (num: number = 1) =>
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ea amet consectetur soluta, veritatis iste, at repudiandae praesentium esse nihil eaque maiores facilis ad! Alias eveniet maiores illum obcaecati perferendis!`.repeat(
    num,
  );

export const genArrFromConst = <
  T extends Record<string, string>,
  K extends FieldValues,
  U extends Path<K>,
>(
  obj: T,
  name: U,
): {
  id: string;
  label: T[keyof T];
  val: keyof T;
  name: U;
  type: "checkbox";
}[] =>
  Object.entries(obj).map((pair) => ({
    id: v4(),
    label: pair[1] as T[keyof T],
    val: pair[0] as keyof T,
    name: name as U,
    type: "checkbox",
  }));

export const serializeData = <T>(arg: T): T => {
  if (arg instanceof FormData || arg instanceof URLSearchParams) {
    const obj: T = {} as {
      [K in keyof T]: T[K];
    };

    for (const [k, v] of arg.entries()) obj[k as keyof T] = v as T[keyof T];

    return obj;
  }

  return arg;
};

export const b64ToFile = async (b64: string) => {
  // ? split metadata from code real encoding image
  const arg = b64.split(",");
  // ? grab mime for first match
  const mime = arg[0].match(/:(.*?);/)?.[1];

  // ? b64 to utf-8 (ASCII safe also) for browser (internally still utf-16 as js keep strings in memory)
  const bStr = atob(arg[1]);

  const n = bStr.length;
  // ? generate box for bytes
  const u8Arg = new Uint8Array(n);

  let i = 0;

  while (i < n) {
    // ? assign utf-16 val from 0 to 255
    u8Arg[i] = bStr.charCodeAt(i);
    i++;
  }

  return new File([u8Arg], v4(), { type: mime });
};
