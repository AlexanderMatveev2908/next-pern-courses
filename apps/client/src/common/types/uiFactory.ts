import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type FormFieldType<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: "text" | "number";
  required?: boolean;
  id?: string;
  place?: string;
  field?: string;
};

export type FormFieldArrayType = {
  name: string;
  label: string;
  type?: "text" | "number";
  required?: boolean;
  id?: string;
  place?: string;
  field?: string;
};

// ? T => form shape defined in zod
// ? K => field name defined in ui factory
// ? T[K] => type of field, String or File mainly, maybe number

export type FormFieldPropsType<T extends FieldValues, K extends Path<T>> = {
  el: FormFieldType<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  showLabel?: boolean;
  isDisabled?: boolean;
  cb?: (val: T[K]) => void;
  index?: number;
};

export type PropsTypeBtn = {
  type: "button" | "submit";
  handleClick?: () => void;
  label: string;
  isEnabled: boolean;
  isLoading?: boolean;
};

export enum BtnActType {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
  NEUTRAL = "NEUTRAL",
}

export type FieldCheckType<T extends FieldValues> = {
  type: "checkbox" | "radio";
  name: Path<T>;
  label: string;
};
