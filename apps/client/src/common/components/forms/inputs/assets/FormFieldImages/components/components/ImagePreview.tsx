/** @jsxImportSource @emotion/react */
"use client";

import { easeInOut } from "framer-motion";
import ImgLoader from "@/common/components/HOC/assets/ImgLoader";
import { Trash2 } from "lucide-react";
import { FC, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type PropsType = {
  handleClick: () => void;
  el: File | string;
};

const ImagePreview: FC<PropsType> = ({ handleClick, el }) => {
  const [isHover, setIsHover] = useState(false);

  const url = useMemo(() => {
    if (typeof el === "string") return el;
    return URL.createObjectURL(el);
  }, [el]);

  useEffect(() => {
    if (typeof el !== "string") {
      return () => URL.revokeObjectURL(url);
    }
  }, [el, url]);

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px] snap-center relative overflow-hidden"
    >
      <ImgLoader src={url} />

      <motion.div
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{
          duration: isHover ? 0.5 : 0.3,
          ease: easeInOut,
        }}
        animate={{
          opacity: isHover ? [0, 1, 1] : 0,
          scale: isHover ? [0, 1.5, 1] : 0,
        }}
        className="w-full h-full absolute inset-0 bg-black/70 z-60 flex flex-col justify-center items-center gap-3 cursor-pointer"
      >
        <span className="txt__lg text-red-600">Remove</span>

        <Trash2 className="w-[40px] h-[40px] text-red-600" />
      </motion.div>
    </div>
  );
};

export default ImagePreview;
