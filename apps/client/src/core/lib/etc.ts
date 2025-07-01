import { FormFieldType } from "@/common/types/uiFactory";
import { capt } from "@shared/first/lib/formatters";
import { FieldValues } from "react-hook-form";
import { v4 } from "uuid";

export const addID = <T>(arg: T[]): (T & { id: string })[] =>
  arg.map((el) => ({
    ...el,
    id: v4(),
  }));

export const getSomePlaceholder = <T extends FieldValues>(
  el: FormFieldType<T>
): string => `${el.place ?? `${capt(el.label)}` ?? `${capt(el.name)}`}...`;
