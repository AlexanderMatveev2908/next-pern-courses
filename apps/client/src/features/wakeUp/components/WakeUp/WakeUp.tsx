/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useEffect, useState, type FC } from "react";
import { wakeUpSliceAPI } from "../../slices/wakeUpSliceAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isStr } from "@shared/first/lib/dataStructure";
import { useSelector } from "react-redux";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import ContentWarn from "./components/ContentWarn";
import { getWakeUkState } from "../../slices/wakeUpSlice";
import { saveStorage } from "@/core/lib/storage";
import { StorageKey } from "@/common/types/storage";

const WakeUp: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isShow, setIsShow] = useState<null | boolean>(null);

  const hook = wakeUpSliceAPI.useLazyWakeUpFlyQuery();
  const [triggerRTK, res] = hook;
  const { isLoading, data } = res;

  const wakeState = useSelector(getWakeUkState);
  // const cacheData = useSelector(
  //   (state: StoreTypeSSR) =>
  //     wakeUpSliceAPI.endpoints.wakeUpFly.select(undefined)(state).data,
  // );

  const { triggerRef } = useWrapQuery({
    ...res,
    showToast: true,
  });

  useEffect(() => {
    if (wakeState.isWakeUp) saveStorage(StorageKey.WAKE_UP, Date.now() + "");
  }, [wakeState.isWakeUp]);

  // const ping = useCallback(async () => {
  //   while (true) {
  //     await new Promise<void>((res) => {
  //       timerID.current = setTimeout(() => {
  //         triggerRTK({}, false);
  //         console.log("run");
  //         clearT(timerID);
  //         res();
  //       }, 1000);
  //     });
  //   }
  // }, [triggerRTK]);

  useEffect(() => {
    if (!isStr(data?.msg)) triggerRTK();
  }, [triggerRTK, data?.msg]);

  const handleClick = async () => {
    triggerRef();
    triggerRTK();
  };

  return (
    <WrapPendingClient {...{ isLoading }}>
      {() => (
        <div className="flex flex-col justify-center items-center gap-10">
          <span
            suppressHydrationWarning
            className="txt__2xl text-neutral-200"
          ></span>

          <WrapPop
            {...{
              isShow: true,
              setIsShow,
              Content: () => <ContentWarn {...{ handleClick, isLoading }} />,
              allowClose: false,
            }}
          ></WrapPop>
        </div>
      )}
    </WrapPendingClient>
  );
};

export default WakeUp;
