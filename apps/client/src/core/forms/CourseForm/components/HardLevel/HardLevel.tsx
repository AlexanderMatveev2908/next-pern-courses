/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import WrapCheck from "../WrapCheck/WrapCheck";
import { fieldHard } from "../../uiFactory";
import WrapBoxes from "@/common/components/forms/HOC/WrapBoxes/WrapBoxes";
import { Difficulties } from "@shared/first/constants/categories";

type PropsType = {};

const HardLevel: FC<PropsType> = ({}) => {
  const nums = Array.from({ length: 23 }, (_, i) => i + 1 + "");
  return (
    <WrapCheck {...{ el: fieldHard }}>
      <WrapBoxes {...{ vals: nums, typeBox: "radio", el: fieldHard }} />
    </WrapCheck>
  );
};

export default HardLevel;
