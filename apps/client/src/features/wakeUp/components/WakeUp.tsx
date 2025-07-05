/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import type { FC } from "react";
import { wakeUpSliceAPI } from "../slices";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import { useWrapMutation } from "@/core/hooks/api/useWrapMutation";

const WakeUp: FC = () => {
  const res = wakeUpSliceAPI.useWakeUpFlyQuery(undefined);
  const { isLoading } = res;

  useWrapQuery({
    ...res,
    showToast: true,
  });

  const { wrapMutation } = useWrapMutation();
  const [mutate, { isLoading: isLoadingMutate }] =
    wakeUpSliceAPI.useSendSomethingMutation();
  const handleClick = async () => {
    await wrapMutation({
      cbAPI: mutate,
      showToast: true,
    });
  };

  return (
    <WrapPendingClient {...{ isLoading }}>
      {() => (
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="txt__2xl text-neutral-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            rerum quaerat quae eligendi necessitatibus tempore sint explicabo
            consequuntur provident eos et beatae at, veniam delectus magni
            distinctio cumque accusamus ipsa.
          </span>

          <div className="w-[250px]">
            <BtnShadow
              {...{
                label: "Wake up",
                btnActType: BtnActType.NEUTRAL,
                isEnabled: true,
                isLoading: isLoadingMutate,
                type: "button",
                handleClick,
              }}
            />
          </div>
        </div>
      )}
    </WrapPendingClient>
  );
};

export default WakeUp;
