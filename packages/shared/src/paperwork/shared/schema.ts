import z from "zod";
import { isStr } from "../../lib/dataStructure.js";

export const schemaOrder = () =>
  z.string().refine((v) => !isStr(v) || ["ASC", "DESC"].some((t) => v === t), {
    message: "Order accept ASC or DESC only",
  });
