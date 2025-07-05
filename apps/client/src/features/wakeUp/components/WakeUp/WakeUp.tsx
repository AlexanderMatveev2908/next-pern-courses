/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useState, type FC } from "react";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import ContentWarn from "./components/ContentWarn";
import { useIsAwake } from "@/core/hooks/api/useIsAwake";
import { __cg } from "@shared/first/lib/logger";

const WakeUp: FC = () => {
  const [isShow, setIsShow] = useState<null | boolean>(false);

  const { isLoading } = useIsAwake({ setIsShow });

  return (
    <WrapPendingClient {...{ isLoading }}>
      {() => (
        <div className="flex flex-col justify-center items-center gap-10">
          <span suppressHydrationWarning className="txt__2xl text-neutral-200">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
            maiores laudantium doloribus, architecto obcaecati quia nesciunt
            natus ab, et hic saepe? Quia aliquid fuga alias repellat non
            laboriosam commodi quae?
          </span>

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
//   (state: StoreTypeSSR) =>
//     wakeUpSliceAPI.endpoints.wakeUpFly.select(undefined)(state).data,
// );
// useEffect(() => {
//   if (!isStr(data?.msg)) triggerRTK();
// }, [triggerRTK, data?.msg]);
