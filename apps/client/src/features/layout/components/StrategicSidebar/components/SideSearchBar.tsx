/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import ExternalTooltipErr from "@/common/components/forms/errors/ExternalTooltipErr";
import RawFieldTxt from "@/common/components/forms/inputs/RawFieldTxt";
import { useGetPosPortal } from "@/core/hooks/ui/useGetPosPortal";
import { FieldGenerator } from "@/core/uiFactory/forms";
import {
  schemaSideSummaryForm,
  SideSummaryFormType,
} from "@shared/first/paperwork/concepts/schema.summary.js";
import { useEffect, useMemo, useRef, type FC } from "react";
import { Path, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { getStrategicSliceState } from "../slices/slice";
import { clearT } from "@/core/lib/etc";
import { __cg } from "@shared/first/lib/logger.js";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isStr } from "@shared/first/lib/dataStructure.js";
import {
  ResultTypeRTK,
  TriggerTypeRTK,
  UnwrappedResAPI,
} from "@/common/types/api";
import { ConceptType } from "@/features/concepts/types";

type ArgType = { courseID: string; vals?: unknown; _?: number };

type PropsType = {
  hook: [
    TriggerTypeRTK<
      UnwrappedResAPI<{ concepts: Partial<ConceptType>[] }>,
      ArgType
    >,
    ResultTypeRTK<
      UnwrappedResAPI<{ concepts: Partial<ConceptType>[] }>,
      ArgType
    >,
    any,
  ];
};

const SideSearchBar: FC<PropsType> = ({ hook }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevValsRef = useRef<Record<string, string>>({});
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<SideSummaryFormType>();
  const vls = watch();

  const { swapState, isSide, currentCourseID } = useSelector(
    getStrategicSliceState,
  );

  const gen = new FieldGenerator<
    SideSummaryFormType,
    Path<SideSummaryFormType>
  >("Concept");

  const optDep = useMemo(() => [swapState], [swapState]);
  const { posParent } = useGetPosPortal({
    contentRef: inputRef,
    optDep,
  });

  const [triggerRTK, res] = hook;

  useWrapQuery({
    ...res,
    showToast: true,
  });

  useEffect(() => {
    let isSameData = false;
    const isValid = schemaSideSummaryForm.safeParse(vls).success;
    if (isValid)
      isSameData = JSON.stringify(prevValsRef.current) === JSON.stringify(vls);

    if (!isValid || isSameData) {
      prevValsRef.current = vls;
      clearT(timerID);
      return;
    }

    clearT(timerID);
    timerID.current = setTimeout(() => {
      prevValsRef.current = vls;
      clearT(timerID);
      triggerRTK(
        {
          courseID: currentCourseID,
          _: Date.now(),
        },
        false,
      );
      __cg("debounce");
    }, 500);

    return () => {
      clearT(timerID);
    };
  }, [vls, prevValsRef, triggerRTK, currentCourseID]);

  useEffect(() => {
    if (!isStr(currentCourseID)) return;

    setValue("title", "", { shouldValidate: true });
    prevValsRef.current = { title: "" };
    triggerRTK({
      courseID: currentCourseID,
    });
  }, [currentCourseID, setValue, prevValsRef, triggerRTK]);

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
