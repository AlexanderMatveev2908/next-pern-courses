import z from "zod";
import { schemaCoursePost } from "./schema.post.js";
import { gradeSchema, schemaTechStack, schemaTool } from "./schema.shared.js";
import { REG_TITLE } from "@shared/first/constants/regex.js";
import { schemaOrder } from "../shared/schema.js";

export const schemaGetListCourse = z.object({
  title: z
    .string()
    .max(50, "Course title must be less than 50 characters")
    .regex(REG_TITLE, "Course title has invalid characters")
    .optional(),
  grade: z.array(gradeSchema()).optional(),
  techStack: z.array(schemaTechStack()).optional(),
  tools: z.array(schemaTool()).optional(),

  createdAtSort: schemaOrder().optional(),
});

export type SchemaGetListCoursesType = z.infer<typeof schemaGetListCourse>;
