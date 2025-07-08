/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  totPages?: number;
  nHits?: number;
};

const PageCounter: FC<PropsType> = ({ nHits, totPages }) => {
  return <div></div>;
};

export default PageCounter;
