import type { FieldValues, Path } from "react-hook-form";

export type FormFieldType<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: "text" | "file";
  required?: boolean;
  id?: string;
  place?: string;
};
