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

  const filtered: FieldCheckValType<T, K>[] = useMemo(() => {
    const hypotheticalParentToShow = filters.find(
      (f): f is SearchFilterType<T, K> => f.name === currFilter,
    );

    return cloneDeep(
      (hypotheticalParentToShow as SearchFilterType<T, K>).options,
    ) as FieldCheckValType<T, K>[];
  }, [filters, currFilter]);

  const handleChange = (f: FieldCheckValType<T, K>) => {
    const existing: T[K] | undefined = getValues(f.name) ?? ([] as T[K]);

    // ? it is parent somewhere and his choice will have side effects

    // const hasSideEffects = innerJoinConf.some(
    //   (conf) => conf.filter.name === f.name,
    // );

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
