import z from "zod";
import { isStr } from "@shared/first/lib/dataStructure.js";

export const schemaOrder = () =>
  z.string().refine((v) => !isStr(v) || ["ASC", "DESC"].some((t) => v === t), {
    message: "Order accept ASC or DESC only",
  });

export type ParamsGenItemSearchBarType = {
  opt: {
    [key: string]: {
      reg: RegExp;
      mavLen: number;
    };
  };
  customValidateCB?: (
    item: Record<string, string>,
    ctx: z.RefinementCtx,
  ) => boolean;
};

export const schemaItemSearchBar = ({
  customValidateCB,
  opt,
}: ParamsGenItemSearchBarType) =>
  z
    .object({
      name: z.string(),
      id: z.string(),
      label: z.string(),
      type: z.string(),
      place: z.string().optional(),
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
