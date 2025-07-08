import { TechStack } from "@prisma/client";
import { repeatKey } from "./utils.js";

export const existingMock: Record<string, any> = {
  ...repeatKey(TechStack, "JAVA"),
  ...repeatKey(TechStack, "JAVASCRIPT"),
  ...repeatKey(TechStack, "HTML"),
  ...repeatKey(TechStack, "POSTGRESQL"),
};
