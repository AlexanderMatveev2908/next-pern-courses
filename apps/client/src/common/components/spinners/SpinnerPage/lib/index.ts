import { uiBreaks } from "@/core/constants/uiBreaks";
import { v4 } from "uuid";

export const getCountSpinner = () => {
  const w = window.innerWidth;

  const count = w > uiBreaks.lg ? 18 : w > 500 ? 15 : 12;

  return Array.from({ length: count }, () => v4());
};
