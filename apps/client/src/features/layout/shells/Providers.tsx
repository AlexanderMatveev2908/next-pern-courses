/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { genStoreRTK } from "@/core/store/store";
import { useRef, type FC } from "react";
import { Provider } from "react-redux";

type PropsType = {
  children: React.ReactNode;
  preloadedState?: any;
};

const Providers: FC<PropsType> = ({ children, preloadedState }) => {
  const store = useRef(genStoreRTK(preloadedState)).current;

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
