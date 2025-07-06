/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { useSearchCtxConsumer } from "./contexts/hooks/useSearchCtxConsumer";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType = {};

const Searchbar: FC<PropsType> = ({}) => {
  const ctx = useSearchCtxConsumer();
  __cg("ctx react", ctx);

  return (
    <form className="w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl"></form>
  );
};

export default Searchbar;
