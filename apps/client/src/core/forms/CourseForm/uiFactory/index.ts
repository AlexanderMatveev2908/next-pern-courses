import { FormFieldType } from "@/common/types/uiFactory";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";

export const titleField: FormFieldType<CourseFormType> = {
  name: "title",
  label: "Course title *",
  type: "text",
  required: true,
};

export const descriptionField: FormFieldType<CourseFormType> = {
  name: "description",
  label: "Course description",
  type: "text",
  required: false,
};

export const imagesField: FormFieldType<CourseFormType> = {
  name: "images",
  label: "Course images * (1-5)",
  type: "file",
  required: true,
};

export const videoField: FormFieldType<CourseFormType> = {
  name: "video",
  label: "Course video",
  type: "file",
  required: false,
};
