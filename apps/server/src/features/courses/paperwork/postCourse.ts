import { REG_CLOUD_URL, REG_ID } from "@shared/first/constants/regex.js";
import { isStr } from "@shared/first/lib/dataStructure.js";
import { schemaCoursePost } from "@shared/first/paperwork/courses/schema.post.js";
import z from "zod";

const schemaFile = (size: number) =>
  z.object({
    fieldname: z.string(),
    filename: z.string().refine((v) => REG_ID.test(v.split(".")[0]), {
      message: "Invalid file name",
    }),

    size: z
      .number()
      .refine((v) => v < 1024 * 1024 * size, "File size is too big"),
  });

export const schemaPostCourseServer = schemaCoursePost
  .omit({ video: true, images: true })
  .extend({
    videoFile: schemaFile(10)
      .extend({
        path: z
          .string()
          .min(1, "Path is required")
          .refine((v) => v.includes("uploads/videos"), "Path is invalid"),
      })
      .optional(),
    video: z
      .string({
        required_error: "Video is required",
        invalid_type_error: "Video must be a string",
      })
      .min(5, "Video is too short")
      .refine((v) => !isStr(v) || REG_CLOUD_URL.test(v), {
        message: "Invalid video url",
      })
      .optional(),
    imageFiles: z
      .array(
        schemaFile(5).extend({
          buffer: z.instanceof(Buffer),
        }),
      )
      .max(5, "You can upload 5 images at most")
      .optional(),

    images: z
      .array(
        z.string().refine((v) => !isStr(v) || REG_CLOUD_URL.test(v), {
          message: "Invalid image url",
        }),
      )
      .max(5, "You can upload 5 images at most")
      .optional(),
  });

export type CourseFormServerType = z.infer<typeof schemaPostCourseServer>;
