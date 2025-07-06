import z from "zod";
import { schemaCoursePost } from "./schema.post.js";
import { gradeSchema, schemaTechStack, schemaTool } from "./schema.shared.js";
import { schemaOrder } from "../shared/schema.js";

export const schemaGetListCourse = schemaCoursePost._def.schema
  .pick({
    title: true,
  })
  .extend({
    grade: z.array(gradeSchema()),
    techStack: z.array(schemaTechStack()),
    tools: z.array(schemaTool()),

    createdAtSort: schemaOrder(),
  });

export type SchemaGetListCoursesType = z.infer<typeof schemaGetListCourse>;
