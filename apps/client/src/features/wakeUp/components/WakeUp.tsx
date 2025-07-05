/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import type { FC } from "react";
import { wakeUpSliceAPI } from "../slices";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";

const WakeUp: FC = () => {
  const res = wakeUpSliceAPI.useWakeUpFlyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { isLoading } = res;

  useWrapQuery({
    ...res,
    showToast: true,
  });

  return (
    <WrapPendingClient {...{ isLoading }}>
      {() => (
        <div className="text-neutral-200 text-4xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rerum
          quaerat quae eligendi necessitatibus tempore sint explicabo
          consequuntur provident eos et beatae at, veniam delectus magni
          distinctio cumque accusamus ipsa.
        </div>
      )}
    </WrapPendingClient>
  );
};

export default WakeUp;
