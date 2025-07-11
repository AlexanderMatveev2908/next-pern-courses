import { FormFieldType } from "@/common/types/uiFactory";
import { FieldValues, Path } from "react-hook-form";

export const genTitleField = <T extends FieldValues, K extends Path<T>>(
  label: string,
): FormFieldType<T> => ({
  name: "title" as K,
  label: `${label} title *`,
  type: "text",
  required: true,
});
