"use client";
import type { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";

type PropsType = {
  children: React.ReactNode;
};

const Providers: FC<PropsType> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
