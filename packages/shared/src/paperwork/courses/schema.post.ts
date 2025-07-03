import {
  AllTools,
  Difficulties,
  TechStack,
  Tools,
} from "@/constants/categories.js";
import {
  REG_CLOUD_URL,
  REG_DESCRIPTION,
  REG_TITLE,
} from "@/constants/regex.js";
import { isIs, isStr } from "@/lib/dataStructure.js";
import { z } from "zod";

export const schemaCoursePost = z.object({
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
    .refine(() => true, "Grade is required")
    .refine((v) => isIs(Difficulties, v), "Grade is invalid"),

  techStack: z.z
    .string()
    .refine(() => true, {
      message: "Tech stack is required",
    })
    .refine((v) => isIs(TechStack, v), "Tech stack is invalid"),
  tools: z
    .string()
    .refine(() => true, {
      message: "Tool is required",
    })
    .refine(
      (v) => AllTools.includes(v as (typeof AllTools)[number]),
      "Tool is invalid",
    ),

  tags: z
    .array(
      z
        .string()
        .max(50, "Tag must be less than 50 characters")
        .regex(REG_TITLE, "Tag has invalid characters")
        .refine(
          (v) => !isStr(v) || v.trim().length >= 2,
          "If provided tag must be at least 2 characters",
        ),
    )
    .max(5, "You can only add 5 tags")
    .optional(),
});

export type CourseFormType = z.infer<typeof schemaCoursePost>;
