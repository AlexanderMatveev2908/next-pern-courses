/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";

type PropsType = {
  handleClick: () => void;
};

const BtnTrash: FC<PropsType> = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="btn__app text-red-600 absolute -top-8 -right-4 border-2 border-red-600 p-3 z-60 bg-[#000] rounded-xl"
      style={
        {
          "--scale__up": 1.2,
        } as React.CSSProperties
      }
      type="button"
    >
      <FaTrashAlt className="min-w-[30px] min-h-[30px]" />
    </button>
  );
};

export default BtnTrash;
