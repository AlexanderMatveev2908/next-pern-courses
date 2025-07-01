import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type FormFieldType<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: "text" | "file";
  required?: boolean;
  id?: string;
  place?: string;
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
};

export type PropsTypeBtn = {
  type: "button" | "submit";
  handleClick?: () => void;
  label: string;
  isEnabled: boolean;
};

export enum BtnActType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}
