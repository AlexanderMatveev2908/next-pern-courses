export const getColsForSwap = () =>
  window.innerWidth > 1300
    ? 4
    : window.innerWidth > 1000
      ? 3
      : window.innerWidth > 700
        ? 2
        : 1;

export const maxRows = 3;

export const calcFieldsForSwap = (colsForSwap: number) => colsForSwap * maxRows;
