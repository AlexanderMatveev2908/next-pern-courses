/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import { css } from "@emotion/react";
import FormFieldBox from "../../../inputs/FormFieldBox";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { FieldCheckType } from "@/common/types/uiFactory";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  valsToMap: T[K][];
  typeBox: "checkbox" | "radio";
  colsForSwap: number;
  data?: T[K][] | T[K];
  setValue: UseFormSetValue<T>;
  el: FieldCheckType<T>;
};

const Swap = <T extends FieldValues, K extends Path<T>>({
  valsToMap,
  colsForSwap,
  typeBox,
  data,
  setValue,
  el,
}: PropsType<T, K>) => {
  const { ids } = useGenIDs({ lengths: [valsToMap.length] });

  const handleClick = (val: T[K]) => {
    if (typeBox === "radio") {
      setValue(el.name, val !== data ? val : ("" as T[K]), {
        shouldValidate: true,
      });
    } else {
      const fallBack = (data ?? []) as T[K][];

      setValue(
        el.name,
        (fallBack.some((item) => item === val)
          ? fallBack.filter((item) => item !== val)
          : [...fallBack, val]) as PathValue<T, T[K]>,
        {
          shouldValidate: true,
        },
      );
    }
  };

  return (
    <div
      className="min-w-full grid justify-items-center gap-8 h-fit"
      css={css`
        grid-template-columns: repeat(${colsForSwap}, 1fr);
      `}
    >
      {ids[0].map((id, i) => (
        <FormFieldBox
          key={id}
          {...{
            val: valsToMap[i],
            isChecked:
              typeBox === "radio"
                ? data === valsToMap[i]
                : ((data ?? []) as T[K][]).some(
                    (item) => item === valsToMap[i],
                  ),
            handleClick: handleClick.bind(null, valsToMap[i]),
          }}
        />
      ))}
    </div>
  );
};

export default Swap;
