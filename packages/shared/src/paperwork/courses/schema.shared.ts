import {
  GradePkg,
  DifficultyType,
  TechStackPkg,
  TechValType,
} from "@shared/first/constants/categories.js";
import { isInObjKeys, isStr } from "@shared/first/lib/dataStructure.js";
import z from "zod";

export const gradeSchema = () =>
  z
    .string()
    .refine(isStr, "Grade is required")
    .refine(
      (v) => isInObjKeys(GradePkg, v as DifficultyType),
      "Grade is invalid",
    );

export const schemaTechStack = () =>
  z
    .string()
    .refine(isStr, {
      message: "Tech stack is required",
    })
    .refine(
      (v) => isInObjKeys(TechStackPkg, v as TechValType),
      "Tech stack is invalid",
    );

export const schemaTool = () =>
  z.string().refine(isStr, {
    message: "Tool is required",
  });
