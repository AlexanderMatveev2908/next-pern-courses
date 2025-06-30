import { uiBreaks } from "../constants/uiBreaks";
import { v4 } from "uuid";

export const getCountSpinner = () => {
  const w = window.innerWidth;

  const count = w > uiBreaks.lg ? 18 : w > 500 ? 15 : 12;

  return Array.from({ length: count }, () => v4());
};

export const resp = (str: keyof typeof uiBreaks | number) =>
  str in uiBreaks
    ? `@media screen and (min-width: ${
        uiBreaks[str as keyof typeof uiBreaks]
      }px)`
    : `@media screen and (min-width: ${str}px)`;
