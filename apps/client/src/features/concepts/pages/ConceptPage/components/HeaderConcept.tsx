/** @jsxImportSource @emotion/react */
"use client";

import { ConceptType } from "@/features/concepts/types";
import type { FC } from "react";
import { css } from "@emotion/react";
import { resp } from "@/core/lib/style";
import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import LinkShadow from "@/common/components/buttons/LinkShadow";
import { buttonsHeaderBuilder } from "../uiFactory";

type PropsType = {
  refs: ConceptType["refs"];
};

const HeaderConcept: FC<PropsType> = ({ refs }) => {
  const { ids } = useGenIDsV2({
    lengths: [2],
  });

  const getterInfo = buttonsHeaderBuilder(refs);
  return (
    <div
      className="w-full grid gap-5 max-w-[90%] mx-auto"
      css={css`
        grid-template-columns: repeat(2, 1fr);
      `}
    >
      {ids[0].map((id, i) => {
        const info = getterInfo.get(i);

        return (
          <div
            key={id}
            className="w-full"
            css={css`
              max-width: 80px;
              ${resp("sm")} {
                max-width: 200px;
              }
              ${info?.$custom.css ?? ""}
            `}
          >
            <LinkShadow
              {...{
                href: info?.href,
                label: info?.label,
                Svg: info?.Svg,
                $customLabelCSS: css`
                  display: none;
                  ${resp("sm")} {
                    display: block;
                  }
                `,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeaderConcept;
