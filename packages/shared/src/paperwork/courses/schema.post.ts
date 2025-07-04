import {
  Difficulties,
  DifficultyType,
  isValidTool,
  TechStack,
  TechValType,
  ToolValType,
} from "../../constants/categories.js";
import {
  REG_CLOUD_URL,
  REG_DESCRIPTION,
  REG_TITLE,
} from "../../constants/regex.js";
import { isInObjKeys, isStr } from "../../lib/dataStructure.js";
import { v4 } from "uuid";
import { z } from "zod";

export const schemaCoursePost = z
  .object({
    title: z
      .string()
      .min(1, "Course title is required")
      .max(50, "Course title must be less than 50 characters")
      .regex(REG_TITLE, "Course title has invalid characters"),
    description: z
      .string()
      .max(2000, "Course description must be less than 2000 characters")
      .regex(REG_DESCRIPTION, "Course description has invalid characters")
      .optional(),

    images: z
      .union([z.array(z.string().url()), z.array(z.instanceof(File))])
      .refine(
        (v) =>
          Array.isArray(v) &&
          v.every((img) =>
            img instanceof File
              ? img.type.startsWith("image")
              : REG_CLOUD_URL.test(img),
          ),
        "File must be an image",
      )
      .refine(
        (v) => Array.isArray(v) && !!v.length,
        "You must upload at least one image",
      )
      .refine(
        (v) => Array.isArray(v) && v.length <= 5,
        "You can only upload 5 images",
      ),
    video: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((v) => !v || v.type.startsWith("video"), "File must be a video")
      .refine(
        (v) => !v || v.size < 10 * 1024 * 1024,
        "Video size must be less than 10MB",
      ),

    markdown: z
      .string()
      .max(10000, "Markdown must be less than 10000 characters")
      .optional(),

    grade: z
      .string()
      .refine(isStr, "Grade is required")
      .refine(
        (v) => isInObjKeys(Difficulties, v as DifficultyType),
        "Grade is invalid",
      ),

    techStack: z
      .string()
      .refine(isStr, {
        message: "Tech stack is required",
      })
      .refine(
        (v) => isInObjKeys(TechStack, v as TechValType),
        "Tech stack is invalid",
      ),
    tools: z.string().refine(isStr, {
      message: "Tool is required",
    }),

    tags: z
      .array(
        z.object({
          field: z.string(),
          name: z.string(),
          label: z.string(),
          type: z.string(),
          id: z.string(),
          val: z
            .string()
            .max(50, "Tag must be less than 50 characters")
            .regex(REG_TITLE, "Tag has invalid characters")
            .refine(
              (v) => !isStr(v) || v.trim().length >= 2,
              "If provided tag must be at least 2 characters",
            ),
        }),
      )
      .max(5, "You can only add 5 tags")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!isValidTool(data.techStack as TechValType, data.tools as ToolValType))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tool is invalid",
        path: ["tools"],
      });

    if (
      !isStr(data.markdown) &&
      !(data.video instanceof File) &&
      !isStr(data.video)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A video or a markdown at least is required",
        path: ["markdown"],
      });
  });

export type CourseFormType = z.infer<typeof schemaCoursePost>;
