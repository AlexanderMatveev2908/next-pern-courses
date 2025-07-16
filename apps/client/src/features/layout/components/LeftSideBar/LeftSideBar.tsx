/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { useSelector } from "react-redux";
import { getLeftSideState } from "./slices/slice";
import { __cg } from "@shared/first/lib/logger.js";

const LeftSideBar: FC = () => {
  const leftSideState = useSelector(getLeftSideState);

  __cg("left", leftSideState.isSide);

  return <div></div>;
};

export default LeftSideBar;
