/** @jsxImportSource @emotion/react */
"use client";

import SpinnerBtn from "@/common/components/spinners/SpinnerBtn";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { strategicSlice } from "../slices/slice";
import ImgLoader from "@/common/components/HOC/assets/ImgLoader";
import { CloudAssetType } from "@/common/types/cloud";

type PropsType<
  T extends { id?: string; title?: string; images?: CloudAssetType[] },
> = {
  isLoading?: boolean;
  arg: T[];
  basePath: string;
  calcIsChosen: (el: T) => boolean;
};

const ColSide = <
  T extends { id?: string; title?: string; images?: CloudAssetType[] },
>({
  arg,
  isLoading,
  basePath,
  calcIsChosen,
}: PropsType<T>) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full min-w-full h-full max-h-full flex flex-col  overflow-y-auto text-white px-4 pb-6">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <SpinnerBtn />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4">
          {arg.map((el) => {
            const isChosen = calcIsChosen(el);

            return (
              <Link
                key={el.id}
                onClick={() => dispatch(strategicSlice.actions.setSide(false))}
                href={`/${basePath}/${el.id}`}
                className={`w-full flex items-center gap-5 transition-all duration-300 py-2 px-3 rounded-xl cursor-pointer group   hover:bg-neutral-200 ${isChosen ? "bg-neutral-200" : ""}`}
              >
                <div className="min-w-[40px] w-[40px] h-[40px] min-h-[40px] relative">
                  <ImgLoader
                    {...{
                      src: el?.images?.[0]?.url,
                    }}
                  />
                </div>

                <span
                  className={`txt__lg clamp__txt transition-all duration-300 group-hover:text-neutral-950 ${isChosen ? "text-neutral-950" : "text-neutral-200"}`}
                  style={{
                    WebkitLineClamp: 3,
                  }}
                >
                  {el.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ColSide;
