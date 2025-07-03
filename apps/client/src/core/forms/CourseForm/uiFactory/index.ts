import { FieldCheckType, FormFieldType } from "@/common/types/uiFactory";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import { v4 } from "uuid";

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
  label: "Course video (mandatory if markdown not provided)",
  type: "file",
  required: false,
};

export const fieldMarkdown: FormFieldType<CourseFormType> = {
  name: "markdown",
  label: "Markdown file (mandatory if video not provided)",
  type: "file",
  required: false,
};

export const fieldHard: FieldCheckType<CourseFormType> = {
  name: "grade",
  label: "Course grade *",
  type: "radio",
};

export const fieldTech: FieldCheckType<CourseFormType> = {
  name: "techStack",
  label: "Tech stack *",
  type: "radio",
};

export const fieldTools: FieldCheckType<CourseFormType> = {
  name: "tools",
  label: "Tools *",
  type: "radio",
};

export const fieldTags: FormFieldType<CourseFormType> = {
  name: "tags",
  type: "text",
  label: "Tags",
};

export const genTagField = (currTag?: number) => ({
  field: "tags",
  id: v4(),
  label: "Tag",
  val: "",
  name: `tags.${currTag ?? 0}.val`,
  type: "text",
});
