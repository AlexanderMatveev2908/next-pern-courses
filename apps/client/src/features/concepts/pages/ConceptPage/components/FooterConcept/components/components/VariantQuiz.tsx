/** @jsxImportSource @emotion/react */
"use client";

import MiniCheckBox from "@/common/components/forms/inputs/FormFiledMiniCheck/components/MiniCheckBox";
import { ConceptType, VariantType } from "@/features/concepts/types";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { FormQuizType } from "@shared/first/paperwork/concepts/schema.quiz.js";
import { CircleCheckBig, CircleX } from "lucide-react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  variant: VariantType;
  outerIdx: number;
  concept: ConceptType;
};

const VariantQuiz: FC<PropsType> = ({ concept, variant, outerIdx }) => {
  const { setValue, watch, trigger } = useFormContext<FormQuizType>();

  const { userConcept, isCompleted } = concept;
  const fallBack = userConcept ?? {
    userAnswers: [],
  };

  const data =
    watch(`quiz.${outerIdx}`) ?? ({} as FormQuizType["quiz"][number]);

  const analyzed = fallBack.userAnswers.find(
    (asw) =>
      asw.questionID === variant.questionID && asw.variantID === variant.id,
  );
  const goodChoice =
    isCompleted &&
    !isObjOK(analyzed) &&
    fallBack.userAnswers.find(
      (choice) =>
        isObjOK(choice.correctAnswer) &&
        choice.correctAnswer!.id === variant.id,
    );

  const AnalyzedSVG = analyzed?.isCorrect ? CircleCheckBig : CircleX;

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

  const twdCSS = "min-w-[40px] min-h-[40px]";

  return (
    <div className="w-full flex items-center gap-6">
      <button
        aria-label="Chose only one of 5 available variants"
        disabled={isCompleted}
        onClick={handleClick}
        className={`min-w-[40px] min-h-[40px] relative enabled:cursor-pointer disabled:cursor-not-allowed`}
      >
        {analyzed ? (
          <AnalyzedSVG
            className={`${twdCSS} ${analyzed.isCorrect ? "text-green-600" : "text-red-600"}`}
          />
        ) : goodChoice ? (
          <CircleCheckBig className={`${twdCSS}  text-green-600`} />
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
