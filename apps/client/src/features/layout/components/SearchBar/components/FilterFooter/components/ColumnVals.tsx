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

  const filtered = useMemo(() => {
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
      );

    // const valsDependsOn = watch(
    //   (hypotheticalParentToShow as InnerJoinFilterConfType<T, K, U>)
    //     .keyDependsOn,
    // );

    // const toShowForEasyChose = Object.entries(
    //   (hypotheticalParentToShow as InnerJoinFilterConfType<T, K, U>)
    //     ?.parentFilterToSync,
    // )
    //   .filter((pair) => (valsDependsOn as string[]).includes(pair[0]))
    //   .flatMap((pair) => ({
    //     id: v4(),
    //     label: pair[1],
    //     val: pair[0],
    //   }));

    // return {
    //   filter: hypotheticalParentToShow,
    //   options: toShowForEasyChose,
    // };
  }, [innerJoinConf, filters, currFilter]);

  const handleChange = (f: OptionFilterCheckType<T, K>) => {
    const existing: T[K] | undefined = getValues(f.name) ?? ([] as T[K]);

    console.log(existing);

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
