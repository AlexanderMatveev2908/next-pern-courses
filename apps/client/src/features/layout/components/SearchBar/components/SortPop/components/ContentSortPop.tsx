/** @jsxImportSource @emotion/react */
"use client";

import { FieldValues, Path } from "react-hook-form";
import { SearchSortType } from "../../../types/uiFactory";
import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import RowSort from "./components/RowSort";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  sorters: SearchSortType<T, K>[];
};

const ContentSortPop = <T extends FieldValues, K extends Path<T>>({
  sorters,
}: PropsType<T, K>) => {
  const { ids } = useGenIDs({ lengths: [sorters.length] });

  return (
    <div className="w-full flex flex-col overflow-y-auto scroll__app min-h-0 max-h-full pb-5 gap-12">
      {sorters.map((s, i) => (
        <RowSort key={ids[0][i]} {...{ sorter: s }} />
      ))}
    </div>
  );
};

export default ContentSortPop;
