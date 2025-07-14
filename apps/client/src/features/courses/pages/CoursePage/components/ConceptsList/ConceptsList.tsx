/** @jsxImportSource @emotion/react */
"use client";

import SubTitle from "@/common/components/elements/SubTitle";
import { ConceptType } from "@/features/concepts/types";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import type { FC } from "react";
import { css } from "@emotion/react";
import { $listItemsCSS } from "@/core/uiFactory/style";
import ConceptItem from "./components/ConceptItem";

type PropsType = {
  concepts?: ConceptType[];
};

const ConceptsList: FC<PropsType> = ({ concepts }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <SubTitle {...{ txt: "Concepts" }} />

      {!isArrOK(concepts) ? (
        <div className="w-full flex justify-start -mt-6">
          <span className="txt__lg text-neutral-400">
            This course has no concepts added right now
          </span>
        </div>
      ) : (
        <div
          css={css`
            ${$listItemsCSS}
          `}
        >
          {concepts!.map((el) => (
            <ConceptItem key={el.id} {...{ concept: el }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConceptsList;
