/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  vals: string[];
  typeBox: "checkbox" | "radio";
};

const Swap: FC<PropsType> = ({ vals, typeBox }) => {


    console.log(vals);
  return <div></div>;
};

export default Swap;
