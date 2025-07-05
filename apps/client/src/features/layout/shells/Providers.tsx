/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { genStoreRTK } from "@/core/store/store";
import { __cg } from "@shared/first/lib/logger";
import { useMemo, type FC } from "react";
import { Provider } from "react-redux";

type PropsType = {
  children: React.ReactNode;
  preloadedState?: any;
};

const Providers: FC<PropsType> = ({ children, preloadedState }) => {
  const store = useMemo(() => genStoreRTK(preloadedState), [preloadedState]);

  __cg("preloaded", preloadedState);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
