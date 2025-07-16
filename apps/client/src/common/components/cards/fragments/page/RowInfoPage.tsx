/** @jsxImportSource @emotion/react */
"use client";

import RowInfo from "@/common/components/elements/RowInfo";
import SubTitle from "@/common/components/elements/SubTitle";
import { ItemLabelValPairType } from "@/common/types/uiFactory";
import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import { resp } from "@/core/lib/style";
import { css } from "@emotion/react";
import type { FC } from "react";

type PropsType = {
  arg: ItemLabelValPairType[];
};

const RowInfoPage: FC<PropsType> = ({ arg }) => {
  const { ids } = useGenIDsV2({
    lengths: [arg.length],
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <SubTitle
        {...{
          txt: "Info",
        }}
      />

      <div
        className="w-full grid gap-6"
        css={css`
          grid-template-columns: 1fr;
          ${resp("sm")} {
          }
          grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
        `}
      >
        {arg.map((el, i) => (
          <div
            key={ids[0][i]}
            className="w-full border-2 border-neutral-600 p-3 rounded-xl h-fit"
          >
            <RowInfo
              {...{
                info: el,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RowInfoPage;
