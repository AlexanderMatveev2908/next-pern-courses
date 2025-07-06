/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useState, type FC } from "react";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import ContentWarn from "./components/ContentWarn";
import { useIsAwake } from "@/core/hooks/api/useIsAwake";
import { __cg } from "@shared/first/lib/logger";
import { getAllDummyItems, wakeUpSlice } from "../../slices/slice";
import { useDispatch, useSelector } from "react-redux";
import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import { wakeUpSliceAPI } from "../../slices/sliceAPI";
import { TagsAPI } from "@/common/types/api";
import { AppStateTypeSSR } from "@/core/store/store";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";

const WakeUp: FC = () => {
  const [isShow, setIsShow] = useState<null | boolean>(false);

  const preloadedData = useSelector(
    (state: AppStateTypeSSR) =>
      wakeUpSliceAPI.endpoints.getListDummyItems.select(undefined)(state)?.data,
  );
  const res = wakeUpSliceAPI.useGetListDummyItemsQuery(undefined, {
    skip: !!preloadedData,
  });
  useWrapQuery({
    ...res,
    showToast: true,
  });
  const { isLoading } = useIsAwake({ setIsShow });

  const dispatch = useDispatch();
  const items = useSelector(getAllDummyItems);

  const handleClick = (id: string) => {
    dispatch(wakeUpSlice.actions.removeDummyItem(id));
    dispatch(
      wakeUpSliceAPI.util.invalidateTags([
        { type: TagsAPI.DUMMY_TAG_LIST, id: "LIST" },
      ]),
    );
  };

  return (
    <WrapPendingClient {...{ isLoading }}>
      {({ isHydrated } = { isHydrated: false }) => (
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="w-full flex flex-wrap gap-8 justify-center">
            {items.map((el) => (
              <div key={el.id} className="w-[150px]">
                <BtnShadow
                  {...{
                    btnActType: BtnActType.NEUTRAL,
                    isEnabled: isHydrated,
                    type: "button",
                    label: el.val + "",
                    isLoading: false,
                    handleClick: handleClick.bind(null, el.id),
                  }}
                />
              </div>
            ))}
          </div>

          <WrapPop
            {...{
              isShow,
              setIsShow,
              Content: () => (
                <ContentWarn
                  {...{ handleClick: () => __cg("yayyyyyyyyy 🤟🏽"), isLoading }}
                />
              ),
              allowClose: false,
            }}
          ></WrapPop>
        </div>
      )}
    </WrapPendingClient>
  );
};

export default WakeUp;

// const cacheData = useSelector(
//   (state: AppStateTypeSSR) =>
//     wakeUpSliceAPI.endpoints.wakeUpFly.select(undefined)(state).data,
// );
// useEffect(() => {
//   if (!isStr(data?.msg)) triggerRTK();
// }, [triggerRTK, data?.msg]);
