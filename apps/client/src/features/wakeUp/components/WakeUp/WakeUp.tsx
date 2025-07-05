/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { wakeUpSliceAPI } from "../../slices/wakeUpSliceAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isStr } from "@shared/first/lib/dataStructure";
import { useDispatch, useSelector } from "react-redux";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import ContentWarn from "./components/ContentWarn";
import { getWakeUkState, wakeUpSlice } from "../../slices/wakeUpSlice";
import { getStorage, saveStorage } from "@/core/lib/storage";
import { StorageKey } from "@/common/types/storage";
import { clearT } from "@/core/lib/etc";
import { __cg } from "@shared/first/lib/logger";

const WakeUp: FC = () => {
  const [isShow, setIsShow] = useState<null | boolean>(true);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const hook = wakeUpSliceAPI.useLazyWakeUpFlyQuery();
  const [triggerRTK, res] = hook;
  const { isLoading, data } = res;

  const wakeState = useSelector(getWakeUkState);
  const isAwakeRef = useRef<boolean>(wakeState.isWakeUp);
  // const cacheData = useSelector(
  //   (state: StoreTypeSSR) =>
  //     wakeUpSliceAPI.endpoints.wakeUpFly.select(undefined)(state).data,
  // );

  const { triggerRef } = useWrapQuery({
    ...res,
    showToast: true,
  });
  const handleClick = useCallback(async () => {
    triggerRef();
    triggerRTK(undefined, false);
  }, [triggerRef, triggerRTK]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const val = getStorage(StorageKey.WAKE_UP);
    __cg("storage wake up", val);

    if (wakeState.isWakeUp) saveStorage(StorageKey.WAKE_UP, Date.now() + "");
  }, [wakeState.isWakeUp]);

  const dispatch = useDispatch();

  const ping = useCallback(async () => {
    while (!isAwakeRef.current) {
      await new Promise<void>((res) => {
        timerID.current = setTimeout(() => {
          handleClick();
          clearT(timerID);

          if (isStr(data?.msg)) {
            __cg("stop");
            dispatch(wakeUpSlice.actions.setIsWakeUp(true));
            isAwakeRef.current = true;
            setIsShow(false);
          }
          res();
        }, 4000);
      });
    }
  }, [handleClick, data, dispatch]);

  useEffect(() => {
    ping();
  }, [ping]);

  // useEffect(() => {
  //   if (!isStr(data?.msg)) triggerRTK();
  // }, [triggerRTK, data?.msg]);

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
              isShow,
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
