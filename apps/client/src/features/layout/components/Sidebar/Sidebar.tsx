/** @jsxImportSource @emotion/react */
"use client";

import { useRef, type FC } from "react";
import BlackBg from "../../../../common/components/elements/BlackBg/BlackBg";
import { useDispatch, useSelector } from "react-redux";
import { getSideState, sideSlice } from "./slice";
import { easeInOut, motion } from "framer-motion";
import TxtScroll from "@/common/components/elements/TxtScroll/TxtScroll";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import { sideLinks } from "./uiFactory";
import Link from "next/link";
import { css } from "@emotion/react";

const Sidebar: FC = ({}) => {
  const sideState = useSelector(getSideState);

  const sideRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  useMouseOut({
    ref: sideRef,
    cb: () => dispatch(sideSlice.actions.setSide(false)),
  });

  return (
    <>
      <BlackBg
        {...{ isDark: sideState.isOpen, classIndexCSS: "z__black_bg__sidebar" }}
      />

      <motion.div
        ref={sideRef}
        className="z__sidebar fixed top-[80px] right-0 h-full w-[80%] sm:w-[600px] bg-[#000] border-l-[3px] border-neutral-800 translate-x-full"
        transition={{ duration: 0.3, ease: easeInOut }}
        animate={{
          opacity: sideState.isOpen ? 1 : 0.5,
          transform: `translateX(${sideState.isOpen ? "-100%" : "0%"})`,
        }}
        css={css`
          pointer-events: ${sideState.isOpen ? "all" : "none"};
        `}
      >
        <div className="w-full h-full flex flex-col gap-3 sm:gap-6  overflow-y-auto">
          <div className="w-full max-w-full flex justify-center sticky top-0 py-2 h-fit border-b-2 border-neutral-800 px-5">
            <TxtScroll
              {...{
                txt: "john@gmail.com",
                CSS: "txt__xl text-neutral-400",
              }}
            />
          </div>

          <div className="w-full flex flex-col overflow-y-auto scroll__app px-5 h-full gap-3">
            {sideLinks.map((el) => (
              <Link
                href={el.href}
                key={el.id}
                onClick={() => dispatch(sideSlice.actions.setSide(false))}
                className="link w-full flex gap-6 items-center py-2"
                css={css`
                  &:hover {
                    svg {
                      transition: 0.3s ease-in-out;
                      filter: drop-shadow(0 0 10px white);
                    }
                  }
                `}
              >
                <el.svg className="w-[30px] h-[30px] text-gray-300" />

                <span className="txt__lg text-gray-300">{el.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
