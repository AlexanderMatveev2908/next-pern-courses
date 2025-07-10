/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxImportSource @emotion/react */
"use client";

import { useMemo } from "react";
import {
  DynamicSubCategoryType,
  SearchFilterType,
} from "../../../types/uiFactory";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";
import { useSearchCtxConsumer } from "../../../contexts/hooks/useSearchCtxConsumer";
import { css } from "@emotion/react";
import FormFieldBoxV2 from "@/common/components/forms/inputs/FormFieldBoxV2";
import { FieldCheckValType } from "@/common/types/uiFactory";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { extractDynamicAllowedFilters } from "../../../lib/style";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  filters: SearchFilterType<T, K>[];
  dynamicFilters: DynamicSubCategoryType<T, K>[];
};

const ColumnVals = <T extends FieldValues, K extends Path<T>>({
  filters,
  dynamicFilters,
}: PropsType<T, K>) => {
  const { watch, setValue, getValues } = useFormContext<T>();
  const {
    searchers: { currFilter },
  } = useSearchCtxConsumer();

  __cg("vals", watch());

  const filtered: FieldCheckValType<T, K>[] = useMemo(() => {
    const normalFilter = filters.find((f) => f.name === currFilter);
    if (normalFilter) return normalFilter.options;

    const dynamicFilter = dynamicFilters.find(
      (el) => el.filter.name === currFilter,
    );
    if (!dynamicFilter) throw new Error("Error sync dynamic filter 😡");

    const dataToGrab = getValues(dynamicFilter!.keyDependsOn as Path<T>);
    if (!isArrOK(dataToGrab)) return dynamicFilter.filter.options;

    const allowed = extractDynamicAllowedFilters(dynamicFilter, dataToGrab);

    const innerFiltered = dynamicFilter.filter.options.filter((f) =>
      new Set(allowed).has(f.val),
    );

    return innerFiltered;
  }, [filters, currFilter, getValues, dynamicFilters]);

  const handleChange = (f: FieldCheckValType<T, K>) => {
    const existing: T[K] | undefined = getValues(f.name) ?? ([] as T[K]);

    const bindDynamicFilter = dynamicFilters.find(
      (el) => el.keyDependsOn === f.name,
    );

    const updated = (
      !Array.isArray(existing)
        ? [f.val]
        : existing!.includes(f.val)
          ? existing!.filter((v: T[K][number]) => v !== f.val)
          : [...existing, f.val]
    ) as PathValue<T, T[K]>;

    setValue(f.name, updated, {
      shouldValidate: true,
    });

    if (!bindDynamicFilter) return;

    const existingBindData =
      getValues(bindDynamicFilter.filter.name as Path<T>) ?? [];

    const allowed = extractDynamicAllowedFilters(bindDynamicFilter, updated);

    const syncFiltered = existingBindData.filter((f) =>
      new Set(allowed).has(f),
    );

    if (syncFiltered.length === existingBindData.length) return;

    setValue(
      bindDynamicFilter.filter.name as Path<T>,
      syncFiltered as PathValue<T, T[K]>,
      {
        shouldValidate: true,
      },
    );
  };

  return (
    <div className="w-full flex flex-col min-h-0 max-h-full overflow-y-auto scroll__app items-start pt-5 px-4 pb-8">
      <div
        className="w-full grid gap-6 h-fit items-start"
        css={css`
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        `}
      >
        {(filtered ?? [])?.map((f) => (
          <FormFieldBoxV2
            key={f.id}
            {...{
              el: f,
              data: watch(f.name),
              handleClick: handleChange.bind(null, f),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColumnVals;
