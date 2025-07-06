import z from "zod";
import { schemaCoursePost } from "./schema.post.js";
import { gradeSchema, schemaTechStack, schemaTool } from "./schema.shared.js";
import { REG_TITLE } from "@shared/first/constants/regex.js";
import { schemaItemSearchBar, schemaOrder } from "../shared/schema.js";

const optItems = {
  title: {
    reg: REG_TITLE,
    mavLen: 50,
  },
  test: {
    reg: /test/,
    mavLen: 10,
  },
};

export const schemaGetListCourse = z.object({
  txtInputs: z
    .array(
      schemaItemSearchBar({
        opt: optItems,
      }),
    )
    .optional(),
  grade: z.array(gradeSchema()).optional(),
  techStack: z.array(schemaTechStack()).optional(),
  tools: z.array(schemaTool()).optional(),

  createdAtSort: schemaOrder().optional(),
});

export type SchemaGetListCoursesType = z.infer<typeof schemaGetListCourse>;
