/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import BlackBg from "../../../../common/components/elements/BlackBg/BlackBg";
import { useSelector } from "react-redux";
import { getSideState } from "./slice";
import { easeInOut, motion } from "framer-motion";
import TxtScroll from "@/common/components/elements/TxtScroll/TxtScroll";

const Sidebar: FC = ({}) => {
  const sideState = useSelector(getSideState);

  return (
    <>
      <BlackBg
        {...{ isDark: sideState.isOpen, classIndexCSS: "z__black_bg__sidebar" }}
      />

      <motion.div
        className="z__sidebar fixed top-[80px] right-0 h-full w-[80%] sm:w-[600px] bg-[#000] border-l-[3px] border-neutral-800 translate-x-full"
        transition={{ duration: 0.3, ease: easeInOut }}
        animate={{
          opacity: sideState.isOpen ? 1 : 0.5,
          transform: `translateX(${sideState.isOpen ? "-100%" : "0%"})`,
        }}
      >
        <div className="w-full h-full flex flex-col gap-2  overflow-y-auto">
          <div className="w-full max-w-full flex justify-center sticky top-0 py-2 h-fit border-b-2 border-neutral-800 px-5">
            <TxtScroll
              {...{
                txt: "john@gmail.com",
                CSS: "txt__xl text-gray-600",
              }}
            />
          </div>

          <div className="w-full flex flex-col overflow-y-auto scroll__app text-white"></div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
