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
  const { setValue, watch } = useFormContext<FormQuizType>();

  const data =
    watch(`quiz.${outerIdx}`) ?? ({} as FormQuizType["quiz"][number]);

  const isAlreadyChosen = !!data!.answerIDs?.length;
  const isChecked =
    isArrOK(data!.answerIDs) &&
    data!.answerIDs?.some((asw) => asw === variant.id);

  const handleClick = () =>
    setValue(
      `quiz.${outerIdx}`,
      isChecked
        ? isAlreadyChosen
          ? {
              questionID: data!.questionID,
              answerIDs: data!.answerIDs.filter((id) => id !== variant.id),
            }
          : null
        : {
            questionID: variant.quizID,
            answerIDs: isAlreadyChosen
              ? [...data!.answerIDs, variant.id]
              : [variant.id],
          },
      { shouldValidate: true },
    );

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
