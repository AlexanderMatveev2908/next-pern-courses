/** @jsxImportSource @emotion/react */
"use client";

import MiniCheckBox from "@/common/components/forms/inputs/FormFiledMiniCheck/components/MiniCheckBox";
import { VariantType } from "@/features/concepts/types";
import type { FC } from "react";

type PropsType = {
  variant: VariantType;
};

const VariantQuiz: FC<PropsType> = ({ variant }) => {
  return (
    <div className="w-full flex items-center gap-6">
      <div className="min-w-[40px] min-h-[40px] relative">
        <MiniCheckBox
          {...{
            isChecked: false,
          }}
        />
      </div>

      <span className="txt__md text-[whitesmoke]">
        {variant.answer.repeat(5)}
      </span>
    </div>
  );
};

export default VariantQuiz;
