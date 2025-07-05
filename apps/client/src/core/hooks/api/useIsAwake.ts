import {
  getWakeUkState,
  wakeUpSlice,
} from "@/features/wakeUp/slices/wakeUpSlice";
import { wakeUpSliceAPI } from "@/features/wakeUp/slices/wakeUpSliceAPI";
import { SetStateAction, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWrapQuery } from "./useWrapQuery";
import { getStorage, saveStorage } from "@/core/lib/storage";
import { StorageKey } from "@/common/types/storage";
import { clearT } from "@/core/lib/etc";
import { isStr } from "@shared/first/lib/dataStructure";
import { toastSlice } from "@/features/layout/components/Toast/slice";

type Params = {
  setIsShow: React.Dispatch<SetStateAction<boolean | null>>;
};

export const useIsAwake = ({ setIsShow }: Params) => {
  const dispatch = useDispatch();
  const hook = wakeUpSliceAPI.useLazyWakeUpFlyQuery();
  const [triggerRTK, res] = hook;
  const { isLoading, data } = res;

  const wakeState = useSelector(getWakeUkState);
  const isAwakeRef = useRef<boolean>(wakeState.isWakeUp);
  const timerID = useRef<NodeJS.Timeout | null>(null);

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

    const delta = Date.now() - +(val ?? 0);
    const minutes = delta / 1000 / 60;

    if (minutes > 15) {
      dispatch(wakeUpSlice.actions.setIsWakeUp(false));
      isAwakeRef.current = false;
    }
  }, [wakeState.isWakeUp, dispatch]);

  const ping = useCallback(async () => {
    while (!isAwakeRef.current) {
      await new Promise<void>((res) => {
        timerID.current = setTimeout(() => {
          if (isStr(data?.msg)) {
            dispatch(wakeUpSlice.actions.setIsWakeUp(true));
            isAwakeRef.current = true;
            dispatch(toastSlice.actions.close());
            setIsShow(false);

            if (typeof window !== "undefined")
              saveStorage(StorageKey.WAKE_UP, Date.now() + "");
          } else {
            handleClick();
          }

          clearT(timerID);

          res();
        }, 4000);
      });
    }
  }, [handleClick, data, dispatch, setIsShow]);

  useEffect(() => {
    ping();

    return () => {
      clearT(timerID);
    };
  }, [ping]);

  return {
    isLoading,
  };
};
