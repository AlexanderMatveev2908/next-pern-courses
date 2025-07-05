/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import SpinnerNoHooks from "../spinners/SpinnerNoHooks/SpinnerNoHooks";
import WrapClient from "./WrapClient";

type PropsType = {
  isLoading: boolean;
  children: () => React.ReactNode;
};

const WrapPendingClient: FC<PropsType> = ({ isLoading, children }) => {
  return isLoading ? (
    <SpinnerNoHooks />
  ) : (
    <WrapClient>
      <div className="w-full flex flex-col items-center gap-8">
        {children()}
      </div>
    </WrapClient>
  );
};

export default WrapPendingClient;
