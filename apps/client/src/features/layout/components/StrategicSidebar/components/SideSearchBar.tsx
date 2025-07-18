/** @jsxImportSource @emotion/react */
"use client";

import RawFieldTxt from "@/common/components/forms/inputs/RawFieldTxt";
import { FieldGenerator } from "@/core/uiFactory/forms";
import { SideSummaryFormType } from "@shared/first/paperwork/concepts/schema.summary.js";
import type { FC } from "react";
import { Path, useFormContext } from "react-hook-form";

const SideSearchBar: FC = () => {
  const { control } = useFormContext<SideSummaryFormType>();

  const gen = new FieldGenerator<
    SideSummaryFormType,
    Path<SideSummaryFormType>
  >("Concept");

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
      />
    </div>
  );
};

export default SideSearchBar;
