/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { ResultTypeRTK, TriggerTypeRTK } from "@/common/types/api";
// import { useSearchCtxConsumer } from "./contexts/hooks/useSearchCtxConsumer";
import SearchRow from "./components/SearchRow";
import { FieldValues, useFormContext } from "react-hook-form";
import { useFocus } from "@/core/hooks/ui/useFocus";
import SearchRowBtns from "./components/SearchRowBtns";

type PropsType<T, K, U extends FieldValues> = {
  hook: [TriggerTypeRTK<T, K>, ResultTypeRTK<T, K>, any];
  txtInputs: U["txtInputs"];
};

const Searchbar = <T, K, U extends FieldValues>({
  txtInputs,
}: PropsType<T, K, U>) => {
  // const ctx = useSearchCtxConsumer();
  const formCtx = useFormContext<U>();
  const { setFocus } = formCtx;

  useFocus({
    cb: () => setFocus(`txtInputs.0.val` as any),
  });
  return (
    <form className="w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl grid grid-cols-1 gap-4">
      <SearchRow {...{ txtInputs }} />

      <SearchRowBtns {...{ txtInputs }} />
    </form>
  );
};

export default Searchbar;
