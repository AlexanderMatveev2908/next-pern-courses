/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useEffect, type FC } from "react";
import { wakeUpSliceAPI } from "../slices/wakeUpSliceAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import { isObjOK } from "@shared/first/lib/dataStructure";
import { useSelector } from "react-redux";
import { StoreTypeSSR } from "@/core/store/store";
import { __cg } from "@shared/first/lib/logger";

const WakeUp: FC = () => {
  const hook = wakeUpSliceAPI.useLazyWakeUpFlyQuery();
  const [trigger, res] = hook;
  const { isLoading, data } = res;

  const cacheData = useSelector(
    (state: StoreTypeSSR) =>
      wakeUpSliceAPI.endpoints.wakeUpFly.select(undefined)(state).data,
  );

  __cg("cached", cacheData);

  useWrapQuery({
    ...res,
    showToast: true,
  });

  useEffect(() => {
    if (!isObjOK(data)) trigger();
  }, [data, trigger]);

  const handleClick = async () => {
    trigger();
  };

  return (
    <WrapPendingClient {...{ isLoading }}>
      {() => (
        <div className="flex flex-col justify-center items-center gap-10">
          <span suppressHydrationWarning className="txt__2xl text-neutral-200">
            {cacheData?.when ?? data?.when}
          </span>

          <div className="w-[250px]">
            <BtnShadow
              {...{
                label: "Wake up",
                btnActType: BtnActType.NEUTRAL,
                isEnabled: true,
                isLoading,
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
