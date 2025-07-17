/** @jsxImportSource @emotion/react */
"use client";

import { X } from "lucide-react";
import type { FC } from "react";

type PropsType = {
  isEnabled?: boolean;
  handleClick: () => void;
};

const CloseBtn: FC<PropsType> = ({ isEnabled = true, handleClick }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn__app absolute top-0 right-0 cursor-pointer"
      disabled={!isEnabled}
      style={
        {
          "--scale__up": "1.35",
        } as React.CSSProperties
      }
    >
      <X className="text-red-600 h-[50px] w-[50px]" />
    </button>
  );
};

export default CloseBtn;
