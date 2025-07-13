import { REG_CLOUD_URL, REG_ID } from "@shared/first/constants/regex.js";
import { isStr } from "@shared/first/lib/dataStructure.js";
import {
  refineTechByStack,
  schemaCoursePost,
} from "@shared/first/paperwork/courses/schema.post.js";
import { serverFilesValidation } from "@src/paperwork/files.js";
import z from "zod";

export const schemaPostCourseServer = schemaCoursePost._def.schema
  .omit({ video: true, images: true })
  .extend(serverFilesValidation())
  .superRefine((data, ctx) => {
    refineTechByStack(data, ctx);
  });

export type CourseFormServerType = z.infer<typeof schemaPostCourseServer>;
