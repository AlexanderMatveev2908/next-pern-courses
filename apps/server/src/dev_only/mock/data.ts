import { TechPkg } from "@shared/first/constants/categories.js";
import { repeatKey } from "./utils.js";

export const existingMock: Record<string, any> = {
  ...repeatKey(TechPkg, "JAVA"),
  ...repeatKey(TechPkg, "JAVASCRIPT"),
  ...repeatKey(TechPkg, "HTML"),
  ...repeatKey(TechPkg, "POSTGRESQL"),
};
