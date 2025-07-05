/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import WrapClient from "./WrapClient";
import SpinnerNoHooks from "../spinners/SpinnerNoHooks/SpinnerNoHooks";

type PropsType = {
  isLoading: boolean;
  children: () => React.ReactNode;
};

const WrapPendingClient: FC<PropsType> = ({ isLoading, children }) => {
  return (
    <WrapClient>
      {isLoading ? (
        <SpinnerNoHooks />
      ) : (
        <div className="w-full flex flex-col items-center gap-8">
          {children()}
        </div>
      )}
    </WrapClient>
  );
};

export default WrapPendingClient;
