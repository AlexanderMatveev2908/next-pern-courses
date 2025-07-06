import { uiBreaks } from "@/core/constants/uiBreaks";
import { isWindow } from "@/core/lib/etc";

export const getLimitPage = () =>
  !isWindow()
    ? 1
    : window.innerWidth > uiBreaks.lg
      ? 4
      : window.innerWidth > uiBreaks.sm
        ? 2
        : 1;

export const handleShowLabel = (w: number) =>
  !isWindow() ? false : window.innerWidth > w;
