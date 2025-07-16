import type {
  ArrayPath,
  Control,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

export type FieldDataType = "file" | "text" | "number";

export type FormFieldType<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: FieldDataType;
  required?: boolean;
  id?: string;
  place?: string;
  field?: string;
};

export type FieldArrType<T extends FieldValues, K extends Path<T>> = {
  id: string;
  name: ArrayPath<T>;
  label: string;
  type: Exclude<FieldDataType, "file">;
  val: string;
  required: boolean;
  place?: string;
  field: K;
};

// ? T => form shape defined in zod
// ? K => field name defined in ui factory
// ? T[K] => type of field, String or File mainly, maybe number

export type FormFieldPropsType<T extends FieldValues, K extends Path<T>> = {
  el: FormFieldType<T> | FieldArrType<T, K>;
  control: Control<T>;
  errors: FieldErrors<T>;
  showLabel?: boolean;
  isDisabled?: boolean;
  cb?: (val: T[K]) => void;
  index?: number;
  manualErr?: string;
  notice?: string;
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
  field?: string;
};

export type FieldCheckValType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  val: string;
  label: string;
  id: string;
  type: "radio" | "checkbox";
};

export type FieldMiniCheckType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  label: string;
  field?: string;
  id?: string;
};

export type ItemLabelValPairType = {
  val: string | number;
  label: string;
};
