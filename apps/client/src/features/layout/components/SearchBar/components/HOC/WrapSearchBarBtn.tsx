/** @jsxImportSource @emotion/react */
"use client";

import BtnIcon from "@/common/components/buttons/BtnIcon/BtnIcon";
import type { FC } from "react";
import { svgSearchBarCSS } from "../../uifactory/style";
import { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import { BtnActType } from "@/common/types/uiFactory";
import { IconType } from "react-icons/lib";
import { useListenCondLabel } from "../../hooks/useListenCondLabel";

type PropsType = {
  $customCSS?: {
    css: SerializedStyles;
  };

  btnActType: BtnActType;
  Svg?: IconType;
  labelConf: [number?, string?];

  handleClick?: () => void;
};

const WrapSearchBarBtn: FC<PropsType> = ({
  $customCSS,
  btnActType,
  Svg,
  handleClick,
  labelConf,
}) => {
  const { showLabel } = useListenCondLabel({ width: labelConf[0] });
  return (
    <div
      css={css`
        width: ${showLabel ? 200 : 80}px;
        ${$customCSS?.css}
      `}
    >
      <BtnIcon
        {...{
          $svgCSS: svgSearchBarCSS,
          isEnabled: true,
          isLoading: false,
          type: "button",
          label: showLabel ? labelConf?.[1] : null,
          btnActType,
          Svg,
          handleClick,
        }}
      />
    </div>
  );
};

export default WrapSearchBarBtn;
