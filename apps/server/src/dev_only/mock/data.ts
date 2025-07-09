import { TechStackPkg } from "@shared/first/constants/categories.js";
import { repeatKey } from "./utils.js";

export const existingMock: Record<string, any> = {
  ...repeatKey(TechStackPkg, "JAVA"),
  ...repeatKey(TechStackPkg, "JAVASCRIPT"),
  ...repeatKey(TechStackPkg, "HTML"),
  ...repeatKey(TechStackPkg, "POSTGRESQL"),
};
