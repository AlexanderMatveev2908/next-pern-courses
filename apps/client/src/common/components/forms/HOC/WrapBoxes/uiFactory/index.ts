import { uiBreaks } from "@/core/constants/uiBreaks";

export const getColsForSwap = () =>
  window.innerWidth > uiBreaks.lg
    ? 4
    : window.innerWidth > uiBreaks.md
      ? 3
      : window.innerWidth > uiBreaks.sm
        ? 2
        : 1;

export const maxRows = 3;

export const calcFieldsForSwap = (colsForSwap: number) => colsForSwap * maxRows;
