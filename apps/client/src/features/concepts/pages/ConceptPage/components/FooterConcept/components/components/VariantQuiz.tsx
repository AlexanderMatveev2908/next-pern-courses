/** @jsxImportSource @emotion/react */
"use client";

import MiniCheckBox from "@/common/components/forms/inputs/FormFiledMiniCheck/components/MiniCheckBox";
import { VariantType } from "@/features/concepts/types";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { FormQuizType } from "@shared/first/paperwork/concepts/schema.quiz.js";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  variant: VariantType;
  outerIdx: number;
};

const VariantQuiz: FC<PropsType> = ({ variant, outerIdx }) => {
  const { setValue, watch, trigger } = useFormContext<FormQuizType>();

  const data =
    watch(`quiz.${outerIdx}`) ?? ({} as FormQuizType["quiz"][number]);

  const isChecked: boolean =
    isArrOK(data!.answerIDs) &&
    data!.answerIDs!.some((id) => id === variant.id);
  const isAlreadyChosen =
    (data?.answerIDs?.length ?? 0) >= 1 &&
    data!.answerIDs.every((id) => id !== variant.id);

  const handleClick = () => {
    setValue(
      `quiz.${outerIdx}`,
      {
        questionID: variant.questionID,
        answerIDs: isAlreadyChosen
          ? [...data!.answerIDs, variant.id]
          : isChecked
            ? data!.answerIDs.filter((id) => id !== variant.id)
            : [variant.id],
      },
      { shouldValidate: true },
    );

    trigger("quiz");
  };

  return (
    <div className="w-full flex items-center gap-6">
      <div
        onClick={handleClick}
        className="min-w-[40px] min-h-[40px] relative cursor-pointer"
      >
        <MiniCheckBox
          {...{
            isChecked: !!isChecked,
          }}
        />
      </div>

      <span className="txt__md text-[whitesmoke]">{variant.answer}</span>
    </div>
  );
};

export default VariantQuiz;
