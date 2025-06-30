/** @jsxImportSource @emotion/react */
"use client";

import { __cg } from "@shared/first/lib/logger";
import { CircleAlert } from "lucide-react";
import type { FC } from "react";
import { easeInOut, motion } from "framer-motion";

type PropsType = {
  error: Error;
  reset: () => void;
};

const Err: FC<PropsType> = ({ error, reset }: PropsType) => {
  __cg("[DEBUG] Render Error", error);

  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center gap-10 sm:gap-16">
      <motion.div
        className="w-full flex justify-center"
        transition={{ duration: 0.8, ease: easeInOut }}
        initial={{ scaleX: 0, scaleY: 0 }}
        animate={{
          scaleX: [1.6, 0.6, 1.3, 0.9, 1.05, 1],
          scaleY: [0.4, 1.4, 0.7, 1.2, 0.95, 1],
        }}
      >
        <CircleAlert className="text-red-600 w-[175px] h-[175px] sm:w-[300px] sm:h-[300px]" />
      </motion.div>

      <div className="w-full flex justify-center max-w-[90%] sm:max-w-[75%]">
        <span className="text-gray-300 txt__lg">
          {error?.message ??
            "A wild Snorlax isfast asleep blocking the road 💤. Try later"}
        </span>
      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={reset}
          className="btn__app w-full max-w-[250px] border-2 border-red-600 rounded-xl py-2 cursor-pointer hover:bg-red-600 hover:text-[whitesmoke] transition-all duration-300"
          style={{ "--scale__up": 1.15 } as React.CSSProperties}
        >
          <span className="txt__lg text-gray-300">Reset</span>
        </button>
      </div>
    </div>
  );
};

export default Err;
