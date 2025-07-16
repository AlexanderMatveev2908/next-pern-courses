/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useSearchCtxConsumer } from "../contexts/hooks/useSearchCtxConsumer";
import { gabFormValsPagination } from "../lib/style";
import { cpyObj } from "@shared/first/lib/etc.js";
import { FieldValues } from "react-hook-form";
import { ZodObject } from "zod";
import { __cg } from "@shared/first/lib/logger.js";
import { clearT } from "@/core/lib/etc";
import { ReqSearchAPI, TriggerTypeRTK } from "@/common/types/api";
import { genURLSearchParams } from "@/core/lib/processForm";

type Params<
  T extends FieldValues,
  K extends ZodObject<any>,
  U,
  R extends ReqSearchAPI,
> = {
  formDataRHF: T;
  zodObj: K;
  triggerRTK: TriggerTypeRTK<U, R>;
  triggerRef: () => void;
};

export const useDebounce = <
  T extends FieldValues,
  K extends ZodObject<any>,
  U,
  R extends ReqSearchAPI,
>({
  zodObj,
  formDataRHF,
  triggerRef,
  triggerRTK,
}: Params<T, K, U, R>) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    preValsRef,
    setCheckPreSubmit,
    checkPreSubmit: { canMakeAPI, isFormValid },
    setPagination,
  } = useSearchCtxConsumer();

  useEffect(() => {
    const merged = cpyObj({
      ...formDataRHF,
      ...gabFormValsPagination({}),
    });

    let isSameData = true;
    const resultZod = zodObj.safeParse(merged);
    const isValid = resultZod.success;
    if (isValid !== isFormValid)
      setCheckPreSubmit({
        el: "isFormValid",
        val: isValid,
      });

    if (isValid && canMakeAPI && !timerID.current)
      isSameData =
        JSON.stringify(preValsRef.current) === JSON.stringify(merged);
    // __cg("comparison data", merged, preValsRef.current);

    if (!isValid || isSameData || !canMakeAPI) {
      preValsRef.current = merged;

      // __cg(
      //   "conf valid data",
      //   ["is valid", isValid],
      //   ["is same data", isSameData],
      //   ["can make api", canMakeAPI],
      // );

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

      triggerRef();
      triggerRTK({
        vals: genURLSearchParams(merged),
      } as R);
      preValsRef.current = merged;
      setPagination({
        el: "block",
        val: 0,
      });
      setPagination({
        el: "page",
        val: 0,
      });
      clearT(timerID);
    }, 500);

    return () => {
      clearT(timerID);
    };
  }, [
    formDataRHF,
    triggerRef,
    preValsRef,
    zodObj,
    canMakeAPI,
    setCheckPreSubmit,
    triggerRTK,
    setPagination,
    isFormValid,
  ]);

  return {};
};
