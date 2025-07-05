/** @jsxImportSource @emotion/react */
"use client";

import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import type { FC } from "react";

type PropsType = {
  handleClick: () => void;
  isLoading: boolean;
};

const ContentWarn: FC<PropsType> = ({ handleClick }) => {
  return (
    <div className="w-full flex flex-col gap-20 mt-20 sm:max-w-[80%] mx-auto">
      <span className="txt__xl text-neutral-200">
        The server hosted on Fly.io is still waking up 💤💤💤
      </span>

      <div className="w-[250px] mx-auto">
        <BtnShadow
          {...{
            label: "Wake up",
            btnActType: BtnActType.NEUTRAL,
            isEnabled: true,
            isLoading: true,
            type: "button",
            handleClick,
          }}
        />
      </div>
    </div>
  );
};

export default ContentWarn;
