import { FormFieldType } from "@/common/types/uiFactory";

export const titleField: FormFieldType<{ title: string }> = {
  name: "title",
  label: "Course title",
  type: "text",
  required: true,
  place: "Course title",
};
