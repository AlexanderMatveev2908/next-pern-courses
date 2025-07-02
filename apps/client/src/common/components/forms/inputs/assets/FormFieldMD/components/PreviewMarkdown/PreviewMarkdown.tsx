/** @jsxImportSource @emotion/react */
"use client";

import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import { BtnActType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure";
import { useState, type FC } from "react";
import ContentMD from "./components/ContentMD";

type PropsType = {
  data?: string;
};

const PreviewMarkdown: FC<PropsType> = ({ data }) => {
  const [isShow, setIsShow] = useState<boolean | null>(null);

  const isData = isStr(data);

  return !isData ? null : (
    <div
      className="w-full flex justify-center min-w-[600px]"
      css={css`
        margin-top: ${isData ? "1rem" : "0px"};
      `}
    >
      <WrapPop
        {...{
          isShow,
          setIsShow,
          Content: () => <ContentMD {...{ data: data! }} />,
        }}
      />

      <div className="w-[250px]">
        <BtnShadow
          {...{
            type: "button",
            btnActType: BtnActType.info,
            isEnabled: true,
            label: "Preview",
            handleClick: () => setIsShow(true),
          }}
        />
      </div>
    </div>
  );
};

export default PreviewMarkdown;
