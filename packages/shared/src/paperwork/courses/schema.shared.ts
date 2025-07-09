import {
  GradePkg,
  GradeType,
  StackPkg,
  StackType,
  TechPkg,
  TechValType,
} from "@shared/first/constants/categories.js";
import { isInObjKeys, isStr } from "@shared/first/lib/dataStructure.js";
import z from "zod";

export const gradeSchema = () =>
  z
    .string()
    .refine(isStr, "Grade is required")
    .refine((v) => isInObjKeys(GradePkg, v as GradeType), "Grade is invalid");

export const schemaStack = () =>
  z
    .string()
    .min(1, "Stack is required")
    .refine((v) => isInObjKeys(StackPkg, v as StackType), {
      message: "Stack is invalid",
    });

export const schemaTech = () =>
  z
    .string()
    .refine(isStr, {
      message: "Tech is required",
    })
    .refine((v) => isInObjKeys(TechPkg, v as TechValType), "Tech is invalid");
