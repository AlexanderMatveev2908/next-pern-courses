import cloneDeep from "lodash.clonedeep";
import { useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { gabFormValsPagination } from "../lib/style";
import { genURLSearchParams } from "@/core/lib/processForm";
import { ReqSearchAPI, TriggerTypeRTK } from "@/common/types/api";
import { useSearchCtxConsumer } from "../contexts/hooks/useSearchCtxConsumer";

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
  const { setPending, setPagination } = useSearchCtxConsumer();

  const searchAPI = useCallback(
    <T extends FieldValues>(
      data: T,
      {
        page,
        limit,
        syncPending,
      }: { page?: number; limit?: number; syncPending?: "submit" | "clear" },
    ) => {
      const merged = cloneDeep({
        ...data,
        ...gabFormValsPagination({ page, limit }),
      });

      const str = genURLSearchParams(merged);

      triggerRef();
      updateNoDebounce({
        vals: merged,
      } as U);
      triggerRTK({ vals: str, _: Date.now() } as K, false);

      if (typeof page === "number")
        setPagination({
          el: "page",
          val: page,
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
    [triggerRef, triggerRTK, updateNoDebounce, setPending, setPagination],
  );

  return {
    searchAPI,
  };
};
