/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import SpinnerNoHooks from "../spinners/SpinnerNoHooks/SpinnerNoHooks";
import WrapClient from "./WrapClient";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";

type PropsType = {
  isLoading: boolean;
  children: (arg?: { isHydrated: boolean }) => React.ReactNode;
  waitHydration?: boolean;
};

const WrapPendingClient: FC<PropsType> = ({
  isLoading,
  children,
  waitHydration,
}) => {
  const { isHydrated } = useListenHydration();

  return isLoading ? (
    <SpinnerNoHooks />
  ) : waitHydration ? (
    <WrapClient>
      <div className="w-full flex flex-col items-center gap-8">
        {children()}
      </div>
    </WrapClient>
  ) : (
    <div className="w-full flex flex-col items-center gap-8">
      {children({ isHydrated })}
    </div>
  );
};

export default WrapPendingClient;
