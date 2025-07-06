/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { ResultTypeRTK, TriggerTypeRTK } from "@/common/types/api";
import { useSearchCtxConsumer } from "./contexts/hooks/useSearchCtxConsumer";
import { __cg } from "@shared/first/lib/logger.js";
import SearchRow from "./components/SearchRow";
import { FieldValues } from "react-hook-form";
import { FormFieldType } from "@/common/types/uiFactory";

type PropsType<T, K, U extends FieldValues> = {
  hook: [TriggerTypeRTK<T, K>, ResultTypeRTK<T, K>, any];
  mainSearchField: FormFieldType<U>;
};

const Searchbar = <T, K, U extends FieldValues>({
  hook,
  mainSearchField,
}: PropsType<T, K, U>) => {
  const ctx = useSearchCtxConsumer();

  return (
    <form className="w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl">
      <SearchRow {...{ mainSearchField }} />
    </form>
  );
};

export default Searchbar;
