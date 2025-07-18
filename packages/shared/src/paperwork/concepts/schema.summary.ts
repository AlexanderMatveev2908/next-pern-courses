import { REG_TITLE } from "@shared/first/constants/regex.js";
import z from "zod";

export const schemaSideSummaryForm = z.object({
  title: z
    .string()
    .regex(REG_TITLE, "Invalid characters")
    .max(50, `Concept title must be less than 50 characters`)
    .optional(),
});

export type SideSummaryFormType = z.infer<typeof schemaSideSummaryForm>;
