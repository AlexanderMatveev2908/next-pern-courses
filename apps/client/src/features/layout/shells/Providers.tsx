"use client";
import { store } from "@/core/store/store";
import type { FC } from "react";
import { Provider } from "react-redux";

type PropsType = {
  children: React.ReactNode;
};

const Providers: FC<PropsType> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
