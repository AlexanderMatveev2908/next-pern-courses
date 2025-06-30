/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import BlackBg from "../../../../common/components/elements/BlackBg/BlackBg";
import { useSelector } from "react-redux";
import { getSideState } from "./slice";

const Sidebar: FC = ({}) => {
  const sideState = useSelector(getSideState);

  return (
    <>
      <BlackBg
        {...{ isDark: sideState.isOpen, classIndexCSS: "z__black_bg__sidebar" }}
      />

      <div className="z__sidebar fixed top-0 right-0 h-full w-[400px] sm:w-[600px] bg-[#000] border-l-[3px] border-neutral-800"></div>
    </>
  );
};

export default Sidebar;
