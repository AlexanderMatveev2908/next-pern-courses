/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  txt: string;
  CSS?: string;
  clamp?: number;
};

const TxtClamp: FC<PropsType> = ({ txt, CSS, clamp = 2 }) => {
  return (
    <div className="justify-center w-full max-w-full flex">
      <span
        className={`clamp__txt w-fit text-center ${
          CSS ?? "txt__lg text-gray-300"
        }`}
        style={{
          WebkitLineClamp: clamp,
        }}
      >
        {txt}
      </span>
    </div>
  );
};

export default TxtClamp;
