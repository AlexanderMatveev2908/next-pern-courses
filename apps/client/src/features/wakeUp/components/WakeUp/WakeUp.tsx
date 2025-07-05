/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useEffect, useState, type FC } from "react";
import { wakeUpSliceAPI } from "../../slices/wakeUpSliceAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isObjOK } from "@shared/first/lib/dataStructure";
import { useSelector } from "react-redux";
import { StoreTypeSSR } from "@/core/store/store";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import ContentWarn from "./components/ContentWarn";

const WakeUp: FC = () => {
  const [isShow, setIsShow] = useState<null | boolean>(null);

  const hook = wakeUpSliceAPI.useLazyWakeUpFlyQuery();
  const [trigger, res] = hook;
  const { isLoading, data } = res;

  const cacheData = useSelector(
    (state: StoreTypeSSR) =>
      wakeUpSliceAPI.endpoints.wakeUpFly.select(undefined)(state).data,
  );

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

          <WrapPop
            {...{
              isShow: true,
              setIsShow,
              Content: () => <ContentWarn {...{ handleClick, isLoading }} />,
            }}
          ></WrapPop>
        </div>
      )}
    </WrapPendingClient>
  );
};

export default WakeUp;
