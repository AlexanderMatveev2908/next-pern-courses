/** @jsxImportSource @emotion/react */
"use client";

import MiniCheckBox from "@/common/components/forms/inputs/FormFiledMiniCheck/components/MiniCheckBox";
import { ConceptType, VariantType } from "@/features/concepts/types";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { FormQuizType } from "@shared/first/paperwork/concepts/schema.quiz.js";
import { CircleCheckBig, CircleX } from "lucide-react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";

type PropsType = {
  variant: VariantType;
  outerIdx: number;
  concept: ConceptType;
};

const VariantQuiz: FC<PropsType> = ({ concept, variant, outerIdx }) => {
  const { setValue, watch, trigger } = useFormContext<FormQuizType>();

  const { userConcept, isCompleted } = concept;

  const data =
    watch(`quiz.${outerIdx}`) ?? ({} as FormQuizType["quiz"][number]);

  const corrected = (userConcept ?? {}).userAnswers?.find(
    (asw) => asw.questionID === data.questionID && asw.variantID === variant.id,
  );
  const CorrectedSVG = corrected?.isCorrect ? CircleCheckBig : CircleX;
  const isCurrChoiceCorrected = isCompleted && corrected;

  __cg("crt", corrected);

  const isChecked: boolean =
    isArrOK(data!.answerIDs) &&
    data!.answerIDs!.some((id) => id === variant.id);
  const isAlreadyChosen =
    (data?.answerIDs?.length ?? 0) >= 1 &&
    data!.answerIDs.every((id) => id !== variant.id);

  const handleClick = () => {
    if (isCompleted) return null;

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
      <button
        aria-label="Chose only one of 5 available variants"
        disabled={isCompleted}
        onClick={handleClick}
        className={`min-w-[40px] min-h-[40px] relative enabled:cursor-pointer disabled:cursor-not-allowed ${isCurrChoiceCorrected ? "" : "opacity-50"}`}
      >
        {isCurrChoiceCorrected ? (
          <CorrectedSVG
            className={`min-w-[40px] min-h-[40px] ${
              corrected?.isCorrect ? "text-green-600" : "text-red-600"
            }`}
          />
        ) : (
          <MiniCheckBox
            {...{
              isChecked: !!isChecked,
            }}
          />
        )}
      </button>

      <span className="txt__md text-[whitesmoke]">{variant.answer}</span>
    </div>
  );
};

export default VariantQuiz;
