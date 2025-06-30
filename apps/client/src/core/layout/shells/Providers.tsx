"use client";
import type { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../../store/store";

type PropsType = {
  children: React.ReactNode;
};

const Providers: FC<PropsType> = ({ children }) => {
  return <Provider {...{ store }}>{children}</Provider>;
};

export default Providers;
