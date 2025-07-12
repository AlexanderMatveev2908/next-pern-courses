/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import SpinnerNoHooks from "../spinners/SpinnerNoHooks/SpinnerNoHooks";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import PrependTitle from "./PrependTitle";

type PropsType = {
  isLoading: boolean;
  isSuccess?: boolean;
  Content: (arg?: { isHydrated: boolean }) => React.ReactNode;
  waitHydration?: boolean;
  CustomSpinner?: React.ReactNode;
  title?: string;
  throwErr?: boolean;
};

const WrapPendingClient: FC<PropsType> = ({
  isLoading,
  isSuccess = true,
  Content,
  waitHydration,
  CustomSpinner,
  title,
  throwErr,
}) => {
  const { isHydrated } = useListenHydration();

  if (isHydrated && !isLoading && !isSuccess && throwErr)
    throw new Error("Miss data expected from server");

  return isLoading || (waitHydration && !isHydrated) ? (
    CustomSpinner || <SpinnerNoHooks />
  ) : (
    <PrependTitle {...{ title }}>
      {isSuccess && Content({ isHydrated })}
    </PrependTitle>
  );
};

export default WrapPendingClient;
