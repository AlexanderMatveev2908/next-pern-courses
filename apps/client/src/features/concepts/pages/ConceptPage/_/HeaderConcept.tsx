/** @jsxImportSource @emotion/react */
"use client";

import { ConceptType } from "@/features/concepts/types";
import { __cg } from "@shared/first/lib/logger.js";
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
  __cg("refs", refs);

  const { ids } = useGenIDsV2({
    lengths: [2],
  });

  const getterInfo = buttonsHeaderBuilder(refs);
  return (
    <div
      className="w-full grid"
      css={css`
        grid-template-columns: 1fr;
        ${resp("sm")} {
          grid-template-columns: repeat(2, 1fr);
        }
      `}
    >
      {ids[0].map((id, i) => {
        const info = getterInfo.get(i);

        return (
          <div
            key={id}
            className="w-full max-w-[200px]"
            css={css`
              ${info?.$custom.css}
            `}
          >
            <LinkShadow
              {...{
                href: info?.href,
                label: info?.label,
                Svg: info?.Svg,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeaderConcept;
