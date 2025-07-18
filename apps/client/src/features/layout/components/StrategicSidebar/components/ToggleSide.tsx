/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStrategicSliceState, strategicSlice } from "../slices/slice";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { SideSummaryFormType } from "@shared/first/paperwork/concepts/schema.summary.js";

const ToggleSide: FC = () => {
  const { setFocus } = useFormContext<SideSummaryFormType>();
  const leftSideState = useSelector(getStrategicSliceState);

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
        onClick={() => {
          dispatch(strategicSlice.actions.setSide(!leftSideState.isSide));
          if (leftSideState.isSide) return;
          const t = setTimeout(() => {
            setFocus("title");
            clearTimeout(t);
          }, 300);
        }}
      >
        <Svg className="text-neutral-200 min-w-[50px] min-h-[50px]" />
      </button>
    </div>
  );
};

export default ToggleSide;
