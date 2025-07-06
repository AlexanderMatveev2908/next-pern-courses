/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { ResultTypeRTK, TriggerTypeRTK } from "@/common/types/api";
import { useSearchCtxConsumer } from "./contexts/hooks/useSearchCtxConsumer";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType<T, K> = {
  hook: [TriggerTypeRTK<T, K>, ResultTypeRTK<T, K>, any];
};

const Searchbar = <T, K>({ hook }: PropsType<T, K>) => {
  const ctx = useSearchCtxConsumer();
  __cg("ctx react", ctx);

  return (
    <form className="w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl"></form>
  );
};

export default Searchbar;
