import { useContext } from "react";
import { SearchCtxValsType } from "./useSearchCtxProvider";
import { SearchCtx } from "../SearchCtx";

export const useSearchCtxConsumer = (): SearchCtxValsType => {
  const ctx = useContext(SearchCtx);

  if (!ctx) throw new Error("Ctx must be consumed within a Provider 😡");

  return ctx;
};
