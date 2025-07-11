/** @jsxImportSource @emotion/react */
"use client";

import Link from "next/link";
import type { FC } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSideState, sideSlice } from "../Sidebar/slice";
import { resp } from "@/core/lib/style";
import { css } from "@emotion/react";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";

const Header: FC = () => {
  const sideState = useSelector(getSideState);

  const dispatch = useDispatch();
  const handleClick = (val: boolean) =>
    dispatch(sideSlice.actions.setSide(val));

  const { isHydrated } = useListenHydration();

  return (
    <div className="pl-[10px] sm:pl-[20px] pr-[10px] w-full border-b-[3px] border-b-neutral-800 sticky top-0 h-[80px] z__header bg-[#000]">
      <div className="w-full h-full items-center grid grid-cols-2">
        <Link href="/" className="grad__txt txt__2xl w-fit">
          NEXT_PERN
        </Link>

        <div className="w-full grid grid-cols-2 items-center">
          <div className=""></div>
          <button
            aria-label="toggle sidebar"
            className="btn__app w-fit justify-self-end"
            onClick={handleClick.bind(null, !sideState.isOpen)}
            disabled={!isHydrated}
            style={
              {
                "--scale__up": 1.3,
              } as React.CSSProperties
            }
            css={css`
              svg {
                width: 45px;
                height: 45px;
              }

              ${resp("sm")} {
                width: 60px;
                height: 60px;
              }
            `}
          >
            {sideState.isOpen ? (
              <X className="text-red-600" />
            ) : (
              <Menu className="text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
