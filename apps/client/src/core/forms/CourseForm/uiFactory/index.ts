import { FormFieldType } from "@/common/types/uiFactory";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";

export const titleField: FormFieldType<CourseFormType> = {
  name: "title",
  label: "Course title",
  type: "text",
  required: true,
};

export const descriptionField: FormFieldType<CourseFormType> = {
  name: "description",
  label: "Course description",
  type: "text",
  required: false,
};
