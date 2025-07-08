import { schemaGetListCourse } from "@shared/first/paperwork/courses/schema.get.js";
import z from "zod";

export const schemaSearchCoursesServer = schemaGetListCourse.extend({
  page: z.number().min(0, "Page must be greater than 0"),
  limit: z
    .number()
    .min(10, "Limit must be greater than 0")
    .max(20, "Limit must be less than 20"),
});
