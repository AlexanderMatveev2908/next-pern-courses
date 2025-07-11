/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import SpinnerNoHooks from "../spinners/SpinnerNoHooks/SpinnerNoHooks";
import WrapClient from "./WrapClient";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";

type PropsType = {
  isLoading: boolean;
  isSuccess?: boolean;
  children: (arg?: { isHydrated: boolean }) => React.ReactNode;
  waitHydration?: boolean;
  CustomSpinner?: React.ReactNode;
};

const WrapPendingClient: FC<PropsType> = ({
  isLoading,
  isSuccess = true,
  children,
  waitHydration,
  CustomSpinner,
}) => {
  const { isHydrated } = useListenHydration();

  return isLoading ? (
    CustomSpinner || <SpinnerNoHooks />
  ) : waitHydration ? (
    <WrapClient>
      <div className="w-full flex flex-col items-center gap-8">
        {isSuccess && children()}
      </div>
    </WrapClient>
  ) : (
    <div className="w-full flex flex-col items-center gap-8">
      {isSuccess && children({ isHydrated })}
    </div>
  );
};

export default WrapPendingClient;
