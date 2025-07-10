/** @jsxImportSource @emotion/react */
"use client";

import { FieldValues, Path } from "react-hook-form";
import {
  DynamicSubCategoryType,
  SearchFilterType,
} from "../../../types/uiFactory";
import { genStyleFilterLabel } from "../uiFactory";
import { useSearchCtxConsumer } from "../../../contexts/hooks/useSearchCtxConsumer";
import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import { useMemo } from "react";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  filters: SearchFilterType<T, K>[];
  dynamicFilters: DynamicSubCategoryType<T, K>[];
};

const ColumnLabels = <T extends FieldValues, K extends Path<T>>({
  filters,
  dynamicFilters,
}: PropsType<T, K>) => {
  const { ids } = useGenIDs({
    lengths: [filters.length + dynamicFilters.length],
  });

  const dynamicFiltersNormalizedAndMerged = useMemo(
    () => [...filters, ...dynamicFilters.map((dnk) => dnk.filter)],
    [dynamicFilters, filters],
  );

  const {
    searchers: { currFilter },
    setSearcher,
  } = useSearchCtxConsumer();

  const handleCurrFilter = (name: string) =>
    setSearcher({ el: "currFilter", val: name });

  return (
    <div className="w-full flex flex-col min-h-0 max-h-full px-3 overflow-y-auto scroll__app items-start gap-6 pt-5">
      {dynamicFiltersNormalizedAndMerged.map((f, i) => (
        <button
          onClick={handleCurrFilter.bind(null, f.name)}
          type="button"
          css={genStyleFilterLabel(currFilter, f.name)}
          key={ids[0][i]}
          className="btn__app w-full flex items-center gap-3 p-2 justify-center rounded-xl"
          style={
            {
              "--scale__up": 1.2,
            } as React.CSSProperties
          }
        >
          <f.Svg className="min-w-[40px] min-h-[40px]" />

          <span className="txt__lg hidden md:block">{f.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ColumnLabels;
