import {
  REG_CLOUD_URL,
  REG_DESCRIPTION,
  REG_TITLE,
} from "@/constants/regex.js";
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
    .optional()
    .refine((v) => !v || v.type.startsWith("video"), "File must be a video")
    .refine(
      (v) => !v || v.size < 10 * 1024 * 1024,
      "Video size must be less than 10MB",
    ),

  markdown: z
    .instanceof(File)
    .optional()
    .refine(
      (v) => !v || v.type === "text/markdown" || v.name.endsWith(".md"),
      "File must be a markdown file",
    ),
});

export type CourseFormType = z.infer<typeof schemaCoursePost>;
