import { REG_ID } from "../constants/regex.js";

export const isIdOk = (id?: string | null) => REG_ID.test(id ?? "");
