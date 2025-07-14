/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import RowInfo from "../../elements/RowInfo";
import { FC } from "react";

type PropsType = {
  arg: { val: string | number; label: string }[];
};

const ShowInfoRowsBackCard: FC<PropsType> = ({ arg }) => {
  const { ids } = useGenIDsV2({
    lengths: [arg.length],
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {arg.map((el, i) => (
        <RowInfo key={ids[0][i]} {...{ info: el }} />
      ))}
    </div>
  );
};

export default ShowInfoRowsBackCard;
