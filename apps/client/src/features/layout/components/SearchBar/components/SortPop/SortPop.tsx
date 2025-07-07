/** @jsxImportSource @emotion/react */
"use client";

import { FieldValues, Path } from "react-hook-form";
import { SearchSortType } from "../../types/uiFactory";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  sorters: SearchSortType<T, K>[];
};

const SortPop = <T extends FieldValues, K extends Path<T>>({
  sorters,
}: PropsType<T, K>) => {
  return <div></div>;
};

export default SortPop;
