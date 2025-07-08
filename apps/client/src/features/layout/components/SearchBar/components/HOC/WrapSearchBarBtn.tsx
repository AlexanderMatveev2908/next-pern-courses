/** @jsxImportSource @emotion/react */
"use client";

import BtnIcon from "@/common/components/buttons/BtnIcon/BtnIcon";
import type { FC } from "react";
import { svgSearchBarCSS } from "../../uifactory/style";
import { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import { BtnActType } from "@/common/types/uiFactory";
import { IconType } from "react-icons/lib";
import { resp } from "@/core/lib/style";

type PropsType = {
  $customCSS?: {
    css: SerializedStyles;
  };
  btnActType: BtnActType;
  Svg?: IconType;
  labelConf: [number?, string?];
  isLoading?: boolean;

  type?: "button" | "submit";
  handleClick?: () => void;
};

const WrapSearchBarBtn: FC<PropsType> = ({
  $customCSS,
  btnActType,
  Svg,
  handleClick,
  labelConf,
  isLoading,
  type = "button",
}) => {
  return (
    <div
      css={css`
        ${$customCSS?.css}
        width: 80px;

        ${resp(labelConf?.[0])} {
          width: 200px;
        }
      `}
    >
      <BtnIcon
        {...{
          $svgCSS: svgSearchBarCSS,
          isEnabled: true,
          isLoading,
          type,
          label: typeof labelConf?.[0] !== "number" ? null : labelConf?.[1],
          $labelCSS:
            typeof labelConf?.[0] !== "number"
              ? null
              : {
                  css: css`
                    display: none;

                    ${resp(labelConf[0])} {
                      display: block;
                    }
                  `,
                },
          btnActType,
          Svg,
          handleClick,
        }}
      />
    </div>
  );
};

export default WrapSearchBarBtn;
