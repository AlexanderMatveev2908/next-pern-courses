/** @jsxImportSource @emotion/react */

"use client";

import { useState, type FC } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import Image from "next/image";

type PropsType = {
  src: string;
  alt?: string;
};

const ImgLoader: FC<PropsType> = ({ src, alt }) => {
  const [loaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full min-w-full">
      {!loaded && (
        <motion.div
          className="absolute inset-0"
          css={css`
            background: linear-gradient(
              to right,
              var(--neutral__800) 0%,
              var(--neutral__700) 40%,
              var(--neutral__800) 80%
            );
            background-size: 200% 100%;
          `}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      )}
      <Image
        src={src}
        alt={alt ?? ""}
        className={`transition-all rounded-xl duration-500 object-cover ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        fill
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ImgLoader;
