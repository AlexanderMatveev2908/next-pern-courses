/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useSearchCtxConsumer } from "../contexts/hooks/useSearchCtxConsumer";
import cloneDeep from "lodash.clonedeep";
import { gabFormValsPagination } from "../lib/style";
import { isSameObj } from "@shared/first/lib/etc.js";
import { FieldValues } from "react-hook-form";
import { ZodObject } from "zod";
import { __cg } from "@shared/first/lib/logger.js";
import { clearT } from "@/core/lib/etc";

type Params<T extends FieldValues, K extends ZodObject<any>> = {
  formDataRHF: T;
  zodObj: K;
};

export const useDebounce = <T extends FieldValues, K extends ZodObject<any>>({
  zodObj,
  formDataRHF,
}: Params<T, K>) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    preValsRef,
    setCheckPreSubmit,
    checkPreSubmit: { canMakeAPI },
  } = useSearchCtxConsumer();

  useEffect(() => {
    const merged = cloneDeep({
      ...formDataRHF,
      ...gabFormValsPagination(),
    });

    const isSameData = isSameObj(merged, preValsRef.current);
    const resultZod = zodObj.safeParse(merged);
    const isValid = resultZod.success;

    // __cg("comparison data", merged, preValsRef.current);

    if (!isValid || isSameData || !canMakeAPI) {
      preValsRef.current = merged;

      __cg(
        "conf valid data",
        ["is valid", isValid],
        ["is same data", isSameData],
        ["can make api", canMakeAPI],
      );

      if (!canMakeAPI)
        setCheckPreSubmit({
          el: "canMakeAPI",
          val: true,
        });

      clearT(timerID);
      return;
    }

    clearT(timerID);

    timerID.current = setTimeout(() => {
      __cg("debounce update");

      preValsRef.current = merged;
      clearT(timerID);
    }, 500);

    return () => {
      clearT(timerID);
    };
  }, [formDataRHF, preValsRef, zodObj, canMakeAPI, setCheckPreSubmit]);

  return {};
};
