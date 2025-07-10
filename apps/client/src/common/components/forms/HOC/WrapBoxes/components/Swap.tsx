/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import { css } from "@emotion/react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { FieldCheckType, FieldCheckValType } from "@/common/types/uiFactory";
import { easeInOut, motion } from "framer-motion";
import FormFieldBoxV2 from "../../../inputs/FormFieldBoxV2";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  valsToMap: FieldCheckValType<T, K>[];
  colsForSwap: number;
  data?: T[K][] | T[K];
  setValue: UseFormSetValue<T>;
  el: FieldCheckType<T>;
  isCurrSwap: boolean;
  cb?: (val: T[K]) => void;
};

const Swap = <T extends FieldValues, K extends Path<T>>({
  valsToMap,
  colsForSwap,
  data,
  setValue,
  el,
  isCurrSwap,
  cb,
}: PropsType<T, K>) => {
  const { ids } = useGenIDs({ lengths: [valsToMap.length] });

  const handleClick = (val: T[K]) => {
    if (el.type === "radio") {
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

    cb?.(val);
  };

  return (
    <motion.div
      className="min-w-full grid justify-items-center gap-10 h-fit"
      css={css`
        grid-template-columns: repeat(${colsForSwap}, 1fr);
      `}
      transition={{
        duration: 0.3,
        ease: easeInOut,
      }}
      animate={{
        opacity: isCurrSwap ? 1 : 0,
      }}
    >
      {ids[0].map((id, i) => (
        <FormFieldBoxV2
          key={id}
          {...{
            data,
            handleClick: handleClick.bind(null, valsToMap[i].val as T[K]),
            el: valsToMap[i],
          }}
        />
      ))}
    </motion.div>
  );
};

export default Swap;
