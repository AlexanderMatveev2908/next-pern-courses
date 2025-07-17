/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeftSideState, leftSideSLice } from "../slices/slice";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const ToggleSide: FC = () => {
  const leftSideState = useSelector(getLeftSideState);

  const Svg = leftSideState.isSide ? FaAngleDoubleLeft : FaAngleDoubleRight;
  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-end mr-1 pt-10">
      <button
        type="button"
        className="btn__app absolute top-0 right-0"
        style={
          {
            "--scale__up": 1.25,
          } as React.CSSProperties
        }
        onClick={() =>
          dispatch(leftSideSLice.actions.setSide(!leftSideState.isSide))
        }
      >
        <Svg className="text-neutral-200 min-w-[50px] min-h-[50px]" />
      </button>
    </div>
  );
};

export default ToggleSide;
