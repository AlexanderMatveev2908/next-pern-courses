import { FieldCheckType, FieldMiniCheckType } from "@/common/types/uiFactory";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";

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

export const fieldRootLanguage: FieldMiniCheckType<
  CourseFormType,
  "rootLanguage"
> = {
  name: "rootLanguage",
  label: "Root Language *",
};
