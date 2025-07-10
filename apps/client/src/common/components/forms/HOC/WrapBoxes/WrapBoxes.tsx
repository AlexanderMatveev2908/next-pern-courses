/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useMemo, useState } from "react";
import { calcFieldsForSwap, getColsForSwap, maxRows } from "./uiFactory";
import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import Swap from "./components/Swap";
import { FieldCheckType, FieldCheckValType } from "@/common/types/uiFactory";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { css } from "@emotion/react";
import { easeInOut, motion } from "framer-motion";
import RowSwapBtns from "@/common/components/HOC/RowSwapBtns/RowSwapBtns";
import Anchor from "../../etc/Anchor";
import ErrFormField from "../../errors/ErrFormField";
import { isObjOK } from "@shared/first/lib/dataStructure";
import { v4 } from "uuid";

export type PropsTypeWrapBoxes<T extends FieldValues, K extends Path<T>> = {
  vals: Record<string, string>;
  el: FieldCheckType<T>;
  txtFallback?: string;
  cb?: (val: T[K]) => void;
};

const WrapBoxes = <T extends FieldValues, K extends Path<T>>({
  vals,
  el,
  txtFallback,
  cb,
}: PropsTypeWrapBoxes<T, K>) => {
  const [colsForSwap, setColsForSwap] = useState(getColsForSwap());
  const [currSwap, setCurrSwap] = useState(0);

  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<T>();
  const data: T[typeof el.name] = watch(el.name);

  const parsedVals: FieldCheckValType<T, K>[] = useMemo(
    () =>
      Object.entries(vals).map((pair) => ({
        id: v4(),
        name: el.name as K,
        label: pair[1],
        val: pair[0],
        type: el.type,
      })),
    [vals, el],
  );

  useEffect(() => {
    const listen = (): void => {
      const updated = getColsForSwap();

      setColsForSwap((prev) => (prev !== updated ? updated : prev));
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, []);

  const totSwaps = useMemo(
    () => Math.ceil(parsedVals.length / (colsForSwap * maxRows)),
    [parsedVals, colsForSwap],
  );

  const { ids } = useGenIDs({
    lengths: [totSwaps],
  });

  useEffect(() => {
    const listen = () => {
      const lastSwap = Math.max(0, totSwaps - 1);
      const shouldShift = currSwap > lastSwap;

      if (shouldShift) setCurrSwap(lastSwap);
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, [currSwap, totSwaps]);

  useEffect(() => {
    setCurrSwap(0);
  }, [vals]);

  return !isObjOK(vals, Boolean) ? (
    <div className="w-full flex justify-center">
      <span className="txt__md text-neutral-200 pb-1 border-b border-neutral-200">
        {txtFallback ?? "Missing fallback text"}
      </span>
    </div>
  ) : (
    <div className="w-full relative">
      <Anchor {...{ name: el.name, register }} />

      <ErrFormField
        {...{
          el,
          errors,
        }}
      />

      <div className="w-full flex flex-col border-[3px] border-neutral-600 rounded-xl p-5 gap-8 overflow-hidden">
        <motion.div
          className="grid"
          css={css`
            grid-template-columns: repeat(${totSwaps}, 100%);
            min-width: 100%;
          `}
          initial={{ transform: "translateX(0)" }}
          transition={{ duration: 0.4, ease: easeInOut }}
          animate={{ transform: `translateX(-${currSwap * 100}%)` }}
        >
          {ids[0].map((id, i) => {
            const fieldsForSwap = calcFieldsForSwap(colsForSwap);

            return (
              <Swap
                key={id}
                {...{
                  valsToMap: parsedVals.slice(
                    i * fieldsForSwap,
                    (i + 1) * fieldsForSwap,
                  ),
                  colsForSwap,
                  data,
                  setValue,
                  el,
                  isCurrSwap: i === currSwap,
                  cb,
                }}
              />
            );
          })}
        </motion.div>

        <RowSwapBtns
          {...{
            currSwap,
            setCurrSwap,
            totSwaps,
          }}
        />
      </div>
    </div>
  );
};

export default WrapBoxes;
