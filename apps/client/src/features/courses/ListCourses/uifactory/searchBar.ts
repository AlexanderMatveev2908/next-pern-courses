import { FormFieldType } from "@/common/types/uiFactory";
import { SchemaGetListCoursesType } from "@shared/first/paperwork/courses/schema.get.js";

export const mainFieldSearch: FormFieldType<SchemaGetListCoursesType> = {
  name: "title",
  label: "Title",
  type: "text",
};
