/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useMemo, useState } from "react";
import { calcFieldsForSwap, getColsForSwap, maxRows } from "./uiFactory";
import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import Swap from "./components/Swap";
import { FieldCheckType } from "@/common/types/uiFactory";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  vals: T[K][];
  typeBox: "checkbox" | "radio";
  el: FieldCheckType<T>;
};

const WrapBoxes = <T extends FieldValues, K extends Path<T>>({
  vals,
  typeBox,
  el,
}: PropsType<T, K>) => {
  const [colsForSwap, setColsForSwap] = useState(getColsForSwap());

  const { watch, setValue } = useFormContext<T>();
  const data: T[K][] | T[K] = watch(el.name);

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
    () => Math.ceil(vals.length / (colsForSwap * maxRows)),
    [vals, colsForSwap],
  );

  const { ids } = useGenIDs({
    lengths: [totSwaps],
  });

  return (
    <div className="w-full flex flex-col border-[3px] border-neutral-600 rounded-xl p-5">
      {ids[0].map((id, i) => {
        const fieldsForSwap = calcFieldsForSwap(colsForSwap);

        return (
          <Swap
            key={id}
            {...{
              valsToMap: vals.slice(i * fieldsForSwap, (i + 1) * fieldsForSwap),
              typeBox,
              colsForSwap,
              data,
              setValue,
              el,
            }}
          />
        );
      })}
    </div>
  );
};

export default WrapBoxes;
