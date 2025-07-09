import { uiBreaks } from "@/core/constants/uiBreaks";
import { isWindow } from "@/core/lib/etc";

export const getLimitPage = () =>
  !isWindow()
    ? 1
    : window.innerWidth > uiBreaks.lg
      ? 4
      : window.innerWidth > uiBreaks.md
        ? 2
        : 1;

export const grabValsPagination = ({
  limit = getLimitPage(),
  page = 0,
  block = 0,
}: {
  limit?: number;
  page?: number;
  block?: number;
}) => ({
  limit,
  page,
  block,
});

export const gabFormValsPagination = ({
  page: argPage = 0,
  limit: argLimit = getLimitPage(),
}: {
  page?: number;
  limit?: number;
}) => {
  const { page, limit } = grabValsPagination({
    page: argPage,
    limit: argLimit,
  });

  return {
    page,
    limit,
  };
};

export const handleShowLabel = (w?: number) =>
  !isWindow() ? false : typeof w !== "number" ? false : window.innerWidth > w;

export const grabNumBlockBtns = () =>
  !isWindow()
    ? 1
    : window.innerWidth > uiBreaks.xl
      ? 8
      : window.innerWidth > uiBreaks.lg
        ? 6
        : window.innerWidth > uiBreaks.md
          ? 4
          : window.innerWidth > uiBreaks.sm
            ? 3
            : window.innerWidth > 400
              ? 2
              : 1;
