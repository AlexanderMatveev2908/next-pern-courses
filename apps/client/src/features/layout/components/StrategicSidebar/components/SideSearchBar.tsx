/** @jsxImportSource @emotion/react */
"use client";

import ExternalTooltipErr from "@/common/components/forms/errors/ExternalTooltipErr";
import RawFieldTxt from "@/common/components/forms/inputs/RawFieldTxt";
import { useGetPosPortal } from "@/core/hooks/ui/useGetPosPortal";
import { FieldGenerator } from "@/core/uiFactory/forms";
import { SideSummaryFormType } from "@shared/first/paperwork/concepts/schema.summary.js";
import { useMemo, useRef, type FC } from "react";
import { Path, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { getStrategicSliceState } from "../slices/slice";

const SideSearchBar: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SideSummaryFormType>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { swapState, isSide } = useSelector(getStrategicSliceState);

  const gen = new FieldGenerator<
    SideSummaryFormType,
    Path<SideSummaryFormType>
  >("Concept");

  const optDep = useMemo(() => [swapState], [swapState]);
  const { posParent } = useGetPosPortal({
    contentRef: inputRef,
    optDep,
  });

  return (
    <div className="w-full px-4">
      <RawFieldTxt
        {...{
          el: gen.genHardCode("title", {
            type: "text",
            required: false,
            chainLabel: true,
          }),
          control,
        }}
        ref={inputRef}
      />

      <ExternalTooltipErr
        {...{
          manualErr: errors?.title?.message,
          top: posParent[0],
          left: posParent[1],
          zCSS: 2000,
          condHide: !isSide,
        }}
      />
    </div>
  );
};

export default SideSearchBar;
