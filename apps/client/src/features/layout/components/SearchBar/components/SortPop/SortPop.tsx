/** @jsxImportSource @emotion/react */
"use client";

import { FieldValues, Path } from "react-hook-form";
import { SearchSortType } from "../../types/uiFactory";
import { useSearchCtxConsumer } from "../../contexts/hooks/useSearchCtxConsumer";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import { useCallback } from "react";
import ContentSortPop from "./components/ContentSortPop";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  sorters: SearchSortType<T, K>[];
};

const SortPop = <T extends FieldValues, K extends Path<T>>({
  sorters,
}: PropsType<T, K>) => {
  const {
    bars: { sortBar },
    setBar,
  } = useSearchCtxConsumer();
  const setIsShow = useCallback(
    (val: boolean | null) => setBar({ el: "sortBar", val }),
    [setBar],
  );

  return (
    <WrapPop
      {...{
        isShow: sortBar,
        setIsShow: setIsShow,
        Content: () => <ContentSortPop {...{ sorters }} />,
      }}
    />
  );
};

export default SortPop;
