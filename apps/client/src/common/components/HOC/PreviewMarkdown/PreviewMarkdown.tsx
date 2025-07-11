/** @jsxImportSource @emotion/react */
"use client";

import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import WrapPop from "@/common/components/HOC/WrapPop/WrapPop";
import { BtnActType } from "@/common/types/uiFactory";
import { css, SerializedStyles } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure";
import { useState, type FC } from "react";
import ContentMD from "./components/ContentMD";

type PropsType = {
  data?: string;
  label?: string;
  btnActType?: BtnActType;
  $customCSS?: {
    css: SerializedStyles;
  };
};

const PreviewMarkdown: FC<PropsType> = ({
  data,
  label,
  btnActType,
  $customCSS,
}) => {
  const [isShow, setIsShow] = useState<boolean | null>(null);

  const isData = isStr(data);

  return !isData ? null : (
    <div
      className="w-full flex justify-center"
      css={css`
        ${$customCSS?.css}
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
            btnActType: btnActType ?? BtnActType.INFO,
            isEnabled: true,
            label: label ?? "Preview",
            handleClick: () => setIsShow(true),
          }}
        />
      </div>
    </div>
  );
};

export default PreviewMarkdown;
