import { monkey, REG_TITLE } from "@/constants/regex.js";
import { z } from "zod";

export const schemaCoursePost = z.object({
  title: z
    .string()
    .min(1, "Course title is required")
    .max(50, "Course title must be less than 50 characters")
    .regex(REG_TITLE, "Course title has invalid characters"),
});

export type CourseFormType = z.infer<typeof schemaCoursePost>;

export const monkeyHOF = () => {
  monkey();
  console.log("i ove hanging around");
};
