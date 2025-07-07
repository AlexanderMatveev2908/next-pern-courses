/** @jsxImportSource @emotion/react */
"use client";

import { useMemo } from "react";
import {
  InnerJoinFilterConfType,
  OptionFilterCheckType,
  SearchFilterType,
} from "../../../types/uiFactory";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";
import { useSearchCtxConsumer } from "../../../contexts/hooks/useSearchCtxConsumer";
import { css } from "@emotion/react";
import FormFieldBoxV2 from "@/common/components/forms/inputs/FormFieldBoxV2";
import { v4 } from "uuid";
import { isArrOK, isStr } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  filters: SearchFilterType<T, K>[];
  innerJoinConf: InnerJoinFilterConfType<T, K>[];
};

const ColumnVals = <T extends FieldValues, K extends Path<T>>({
  filters,
  innerJoinConf,
}: PropsType<T, K>) => {
  const { watch, setValue, getValues } = useFormContext<T>();
  const {
    searchers: { currFilter },
  } = useSearchCtxConsumer();

  const filtered: OptionFilterCheckType<T, K>[] = useMemo(() => {
    const isAboutInnerJoin = innerJoinConf.some(
      (conf) => conf.filter.name === currFilter,
    );
    const hypotheticalParentToShow = isAboutInnerJoin
      ? innerJoinConf.find(
          (conf): conf is InnerJoinFilterConfType<T, K> =>
            conf.filter.name === currFilter,
        )
      : filters.find((f): f is SearchFilterType<T, K> => f.name === currFilter);

    if (!isAboutInnerJoin)
      return cloneDeep(
        (hypotheticalParentToShow as SearchFilterType<T, K>).options,
      ) as OptionFilterCheckType<T, K>[];

    // ? must exist common key to keep on the logic of dynamic sub filters
    const valsDependsOn = getValues(
      (hypotheticalParentToShow as InnerJoinFilterConfType<T, K>).keyDependsOn,
    );

    if (!isArrOK(valsDependsOn))
      return (hypotheticalParentToShow as InnerJoinFilterConfType<T, K>).filter
        .options;

    try {
      const toShowForEasyChose = Object.entries(
        (hypotheticalParentToShow as InnerJoinFilterConfType<T, K>)
          ?.parentFilterToSync,
      )
        .filter((pair) => (valsDependsOn as string[]).includes(pair[0]))
        .flatMap((pair) =>
          Object.entries(pair[1]).map((innerPair) => ({
            label: innerPair[1] as string,
            val: innerPair[0],
            name: (hypotheticalParentToShow as InnerJoinFilterConfType<T, K>)
              .filter.name as K,
            id: v4(),
            type: "checkbox" as const,
          })),
        );

      if (
        !Array.isArray(toShowForEasyChose) ||
        !toShowForEasyChose.every((el) =>
          Object.values(el).every((v) => isStr(v as string)),
        )
      )
        return [];

      return toShowForEasyChose;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      __cg("inner join err", err);

      return [];
    }
  }, [innerJoinConf, filters, currFilter, getValues]);

  const handleChange = (f: OptionFilterCheckType<T, K>) => {
    const existing: T[K] | undefined = getValues(f.name) ?? ([] as T[K]);

    setValue(
      f.name,
      (!Array.isArray(existing)
        ? [f.val]
        : existing!.includes(f.val)
          ? existing!.filter((v: T[K][number]) => v !== f.val)
          : [...existing, f.val]) as PathValue<T, T[K]>,
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
