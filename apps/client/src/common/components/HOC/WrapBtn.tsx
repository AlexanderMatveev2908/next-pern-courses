/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import SpinnerBtn from "../spinners/SpinnerBtn";

type PropsType = {
  isLoading: boolean;
  children: React.ReactNode;
};

const WrapBtn: FC<PropsType> = ({ children, isLoading }) => {
  return isLoading ? (
    <div className="w-full flex justify-center">
      <SpinnerBtn />
    </div>
  ) : (
    children
  );
};

export default WrapBtn;
