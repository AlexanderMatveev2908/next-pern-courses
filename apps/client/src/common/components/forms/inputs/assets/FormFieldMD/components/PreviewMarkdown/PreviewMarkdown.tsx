/** @jsxImportSource @emotion/react */
"use client";

import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure";
import type { FC } from "react";

type PropsType = {
  data?: string;
};

const PreviewMarkdown: FC<PropsType> = ({ data }) => {
  const isData = isStr(data);

  return !isData ? null : (
    <div
      className="w-full flex justify-center min-w-[600px]"
      css={css`
        margin-top: ${isData ? "1rem" : "0px"};
      `}
    >
      <div className="w-[250px]">
        <BtnShadow
          {...{
            type: "button",
            btnActType: BtnActType.info,
            isEnabled: true,
            label: "Preview",
            handleClick: () => null,
          }}
        />
      </div>
    </div>
  );
};

export default PreviewMarkdown;
