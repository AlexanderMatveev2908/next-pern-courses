import z from "zod";
import { isStr } from "@shared/first/lib/dataStructure.js";
import {
  REG_CLOUD_URL,
  REG_DESCRIPTION,
  REG_INTEGER,
  REG_TITLE,
} from "@shared/first/constants/regex.js";

export const schemaTitle = (label: string) =>
  z
    .string()
    .min(1, `${label} title is required`)
    .max(50, `${label} title must be less than 50 characters`)
    .regex(REG_TITLE, `${label} title has invalid characters`);

export const schemaGenericTxt = (max: number, label: string) =>
  z
    .string()
    .min(1, `${label} field is required`)
    .max(max, `${label} description must be less than 500 characters`)
    .regex(REG_DESCRIPTION, `${label} description has invalid characters`);

export const schemaDescription = (label: string) =>
  z
    .string()
    .max(2000, `${label} description must be less than 2000 characters`)
    .regex(REG_DESCRIPTION, `${label} description has invalid characters`)
    .optional();

export const schemaImages = () =>
  z
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
    );

export const schemaVideo = () =>
  z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((v) => !v || v.type.startsWith("video"), "File must be a video")
    .refine(
      (v) => !v || v.size < 10 * 1024 * 1024,
      "Video size must be less than 10MB",
    );

export const schemaMarkdown = () =>
  z
    .string()
    .min(1, "Markdown is required")
    .max(10000, "Markdown must be less than 10000 characters");

export const schemaOrder = () =>
  z.string().refine((v) => !isStr(v) || ["ASC", "DESC"].some((t) => v === t), {
    message: "Order accept ASC or DESC only",
  });

export const schemaInteger = (label: string) =>
  z
    .string()
    .min(1, `${label} field is required`)
    .regex(REG_INTEGER, "Invalid integer format")
    .refine((v) => !!v, {
      message: `${label} must be a positive number`,
    });

export type ParamsGenItemSearchBarType = {
  opt: {
    [key: string]: {
      reg: RegExp;
      mavLen: number;
    };
  };
  customValidateCB?: (
    item: Record<string, string | boolean>,
    ctx: z.RefinementCtx,
  ) => boolean;
};

export const defaultItemObjSchema = () =>
  z.object({
    name: z.string(),
    id: z.string(),
    label: z.string(),
    type: z.string(),
    place: z.string().optional(),
    field: z.string().optional(),
    required: z.boolean().optional(),
  });

export const schemaItemSearchBar = ({
  customValidateCB,
  opt,
}: ParamsGenItemSearchBarType) =>
  defaultItemObjSchema()
    .extend({
      val: z.string(),
    })
    .superRefine((item, ctx) => {
      const { name } = item;

      const reg = opt[name]?.reg;
      const mavLen = opt[name]?.mavLen;

      if (reg instanceof RegExp && !reg.test(item.val))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid ${name} value`,
          path: ["val"],
        });

      if (typeof mavLen === "number" && item.val.length > mavLen)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Value must be less than ${mavLen} characters`,
          path: ["val"],
        });

      if (typeof customValidateCB === "function") customValidateCB(item, ctx);
    });
