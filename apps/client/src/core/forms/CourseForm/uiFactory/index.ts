import { FieldCheckType, FormFieldType } from "@/common/types/uiFactory";
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

export const fieldMarkdown: FormFieldType<CourseFormType> = {
  name: "markdown",
  label: "Markdown file *",
  type: "file",
  required: false,
};

export const fieldHard: FieldCheckType<CourseFormType> = {
  name: "grade",
  label: "Course Difficulty *",
  type: "radio",
};

export const fieldStack: FieldCheckType<CourseFormType> = {
  name: "stack",
  label: "Stack *",
  type: "radio",
};

export const fieldTech: FieldCheckType<CourseFormType> = {
  name: "tech",
  label: "Tech *",
  type: "radio",
};
