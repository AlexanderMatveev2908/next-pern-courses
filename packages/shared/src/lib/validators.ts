import { REG_ID } from "../constants/regex.js";

export const isOkID = (id?: string | null) => REG_ID.test(id ?? "");
