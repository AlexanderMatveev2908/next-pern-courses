/** @jsxImportSource @emotion/react */
"use client";

import React, { useCallback, useRef, type FC } from "react";
import BlackBg from "../../elements/BlackBg/BlackBg";
import { varPop } from "./uiFactory";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import { motion } from "framer-motion";
import CloseBtn from "../../buttons/CloseBtn";

type PropsType = {
  isShow: boolean | null;
  setIsShow:
    | ((val: boolean | null) => void)
    | React.Dispatch<React.SetStateAction<boolean | null>>;

  Content: React.ReactNode | (() => React.ReactNode);
  allowClose?: boolean;
};

const WrapPop: FC<PropsType> = ({
  isShow,
  setIsShow,
  Content,
  allowClose = true,
}) => {
  const popRef = useRef<HTMLDivElement | null>(null);

  const cb = useCallback(() => {
    if (allowClose) setIsShow(false);
  }, [setIsShow, allowClose]);

  useMouseOut({
    cb,
    ref: popRef,
  });

  return (
    <>
      <BlackBg {...{ isDark: isShow, classIndexCSS: "z__black_bg__popup" }} />

      <motion.div
        ref={popRef}
        className="z__popup fixed inset-0 m-auto w-[80%] max-w-[600px] h-full max-h-[600px] bg-neutral-950 p-5 rounded-2xl border-neutral-600 border-[3px]"
        initial={{
          scaleX: 0,
          scaleY: 0,
        }}
        variants={varPop}
        animate={
          typeof isShow === "boolean" ? (isShow ? "open" : "close") : undefined
        }
      >
        <div className="flex flex-col relative max-h-full -mt-2 pb-5">
          <CloseBtn
            {...{
              handleClick: () => setIsShow(false),
              isEnabled: allowClose,
            }}
          />
        </div>

        <div className="h-full w-full pt-8">
          {typeof Content === "function" ? Content() : Content}
        </div>
      </motion.div>
    </>
  );
};

export default WrapPop;
