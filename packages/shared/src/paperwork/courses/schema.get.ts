import z from "zod";
import { gradeSchema, schemaStack, schemaTech } from "./schema.shared.js";
import { REG_TITLE } from "@shared/first/constants/regex.js";
import { schemaItemSearchBar, schemaOrder } from "../shared/schema.js";

const optItems = {
  title: {
    reg: REG_TITLE,
    mavLen: 50,
  },
};

const sortableFields = [
  "createdAtSort",
  "timeEstimatedSort",
  "pointsGainedSort",
] as const;

export const schemaGetListCourse = z.object({
  txtInputs: z
    .array(
      schemaItemSearchBar({
        opt: optItems,
      }),
    )
    .optional(),
  grade: z.array(gradeSchema()).optional(),
  stack: z.array(schemaStack()).optional(),
  tech: z.array(schemaTech()).optional(),

  ...sortableFields.reduce(
    (acc, curr) => {
      acc[curr as keyof typeof acc] = schemaOrder().optional();

      return acc;
    },
    {} as Record<
      (typeof sortableFields)[number],
      z.ZodOptional<ReturnType<typeof schemaOrder>>
    >,
  ),

  _: z.number().optional(),
});

export type SchemaGetListCoursesType = z.infer<typeof schemaGetListCourse>;
