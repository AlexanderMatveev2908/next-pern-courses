/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import SpinnerNoHooks from "../spinners/SpinnerNoHooks/SpinnerNoHooks";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import PrependTitle from "./PrependTitle";
import { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";

type PropsType = {
  isLoading: boolean;
  isSuccess?: boolean;
  children: (arg: { isHydrated: boolean }) => React.ReactNode;
  // Content: (arg?: { isHydrated: boolean }) => React.ReactNode;
  waitHydration?: boolean;
  CustomSpinner?: React.ReactNode;
  title?: string;
  throwErr?: boolean;
  $customCSS?: SerializedStyles;
};

const WrapPendingClient: FC<PropsType> = ({
  isLoading,
  isSuccess = true,
  children,
  // Content,
  waitHydration,
  CustomSpinner,
  title,
  throwErr,
  $customCSS,
}) => {
  const { isHydrated } = useListenHydration();

  if (isHydrated && !isLoading && !isSuccess && throwErr)
    throw new Error("Miss data expected from server");

  const isSpinning = isLoading || (waitHydration && !isHydrated);

  return (
    <div
      className="flex flex-col"
      css={css`
        ${$customCSS
          ? $customCSS
          : css`
              width: 100%;
              max-width: 100%;
            `.styles}
      `}
    >
      {isSpinning ? (
        CustomSpinner || <SpinnerNoHooks />
      ) : (
        <PrependTitle
          {...{
            title,
          }}
        >
          {isSuccess &&
            typeof children === "function" &&
            children({ isHydrated })}
        </PrependTitle>
      )}
    </div>
  );
};

export default WrapPendingClient;
