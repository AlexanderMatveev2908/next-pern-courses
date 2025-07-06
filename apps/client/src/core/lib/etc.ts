import { FormFieldArrayType, FormFieldType } from "@/common/types/uiFactory";
import { capt } from "@shared/first/lib/formatters";
import { RefObject } from "react";
import { FieldValues } from "react-hook-form";
import { v4 } from "uuid";

export const addID = <T>(arg: T[]): (T & { id: string })[] =>
  arg.map((el) => ({
    ...el,
    id: v4(),
  }));

export const getSomePlaceholder = <T extends FieldValues>(
  el: FormFieldType<T> | FormFieldArrayType,
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
