/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  title: string;
};

const Title: FC<PropsType> = ({ title }) => {
  return (
    <div className="w-full flex justify-center">
      <span className="txt__xl grad__txt">{title}</span>
    </div>
  );
};

export default Title;
