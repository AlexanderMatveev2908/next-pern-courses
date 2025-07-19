/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { useSelector } from "react-redux";
import { getStrategicSliceState } from "../slices/slice";
import ColSide from "./ColSide";
import { ConceptType } from "@/features/concepts/types";
import {
  ResultTypeRTK,
  TriggerTypeRTK,
  UnwrappedResAPI,
} from "@/common/types/api";
import { FC } from "react";

type PropsType = {
  hook: [
    TriggerTypeRTK<
      UnwrappedResAPI<{ concepts: Partial<ConceptType>[] }>,
      { courseID: string; vals?: unknown }
    >,
    ResultTypeRTK<
      UnwrappedResAPI<{ concepts: Partial<ConceptType>[] }>,
      { courseID: string; vals?: unknown }
    >,
    any,
  ];
  isAlwaysOpen: boolean;
};

const SideConceptsList: FC<PropsType> = ({ isAlwaysOpen, hook }) => {
  const { currentConceptID } = useSelector(getStrategicSliceState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, res] = hook;
  const { data: { concepts = [] } = {}, isLoading, isFetching } = res;

  const calcIsChosen = (el: Partial<ConceptType>) => el.id === currentConceptID;

  return (
    <ColSide
      {...{
        isAlwaysOpen,
        basePath: "concepts",
        isLoading: isLoading || isFetching,
        arg: concepts,
        calcIsChosen,
      }}
    />
  );
};

export default SideConceptsList;
