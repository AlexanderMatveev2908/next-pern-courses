import {
  REG_CLOUD_URL,
  REG_DESCRIPTION,
  REG_TITLE,
} from "@shared/first/constants/regex.js";
import { RefinementCtx, z } from "zod";
import { gradeSchema, schemaStack, schemaTech } from "./schema.shared.js";
import { isValidTech } from "@shared/first/lib/dataStructure.js";
import { StackType, TechValType } from "@shared/first/constants/categories.js";
import {
  schemaDescription,
  schemaImages,
  schemaMarkdown,
  schemaTitle,
  schemaVideo,
} from "../shared/schema.js";

export const refineTechByStack = (
  data: Record<string, any>,
  ctx: RefinementCtx,
) => {
  if (!isValidTech(data.tech as TechValType, data.stack as StackType))
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid tech for stack",
      path: ["tech"],
    });
};

export const schemaCoursePost = z
  .object({
    title: schemaTitle("Course"),
    description: schemaDescription("Course"),

    images: schemaImages(),
    video: schemaVideo(),

    markdown: schemaMarkdown(),

    grade: gradeSchema(),
    stack: schemaStack(),
    tech: schemaTech(),

    rootLanguage: z.boolean().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    refineTechByStack(data, ctx);
  });

export type CourseFormType = z.infer<typeof schemaCoursePost>;
