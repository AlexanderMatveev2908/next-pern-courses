/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import { isStr } from "@shared/first/lib/dataStructure.js";
import { FieldValues } from "react-hook-form";
import { LuPartyPopper } from "react-icons/lu";

type PropsType<T extends FieldValues> = {
  nHits: number;
  mainInput?: FormFieldType<T> & { val: any };
  isLoading: boolean;
};

const ShowCount = <T extends FieldValues>({
  nHits,
  mainInput,
  isLoading,
}: PropsType<T>) => {
  return (
    <div className="w-full grid grid-cols-1 mt-10">
      <div className="w-full flex items-center gap-6">
        {!!nHits && (
          <LuPartyPopper className="w-[40px] h-[40px] text-neutral-200" />
        )}

        <span className="txt__lg text-neutral-200">
          {nHits}&nbsp;{nHits === 1 ? "result" : "results"}
        </span>

        <span className="txt__md text-neutral-400">
          {isStr(mainInput?.val) && !isLoading && `for "${mainInput?.val}"`}
        </span>
      </div>
    </div>
  );
};

export default ShowCount;
