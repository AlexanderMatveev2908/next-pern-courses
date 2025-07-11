import { useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { gabFormValsPagination } from "../lib/style";
import { genURLSearchParams } from "@/core/lib/processForm";
import { ReqSearchAPI, TriggerTypeRTK } from "@/common/types/api";
import { useSearchCtxConsumer } from "../contexts/hooks/useSearchCtxConsumer";
import { cpyObj } from "@shared/first/lib/etc.js";

type Params<T, K extends ReqSearchAPI, U> = {
  triggerRef: () => void;
  triggerRTK: TriggerTypeRTK<T, K>;
  updateNoDebounce: (arg: U) => void;
};

export const useFactoryAPI = <T, K extends ReqSearchAPI, U>({
  triggerRTK,
  triggerRef,
  updateNoDebounce,
}: Params<T, K, U>) => {
  const { setPending, setPagination, clearPagination } = useSearchCtxConsumer();

  const searchAPI = useCallback(
    <T extends FieldValues>(
      data: T,
      {
        page,
        limit,
        block,
        syncPending,
        resetPagination,
      }: {
        page?: number;
        limit?: number;
        block?: number;
        resetPagination?: boolean;
        syncPending?: "submit" | "clear";
      },
    ) => {
      const merged = cpyObj({
        ...data,
        ...gabFormValsPagination({ page, limit }),
      });

      const str = genURLSearchParams(merged);

      triggerRef();
      updateNoDebounce({
        vals: merged,
      } as U);
      triggerRTK({ vals: str, _: Date.now() } as K, false);

      if (resetPagination) clearPagination();
      if (typeof page === "number")
        setPagination({
          el: "page",
          val: page,
        });
      if (typeof block === "number")
        setPagination({
          el: "block",
          val: block,
        });
      if (typeof limit === "number")
        setPagination({
          el: "limit",
          val: limit,
        });

      if (syncPending)
        setPending({
          el: syncPending,
          val: true,
        });
    },
    [
      triggerRef,
      triggerRTK,
      updateNoDebounce,
      setPending,
      clearPagination,
      setPagination,
    ],
  );

  return {
    searchAPI,
  };
};
