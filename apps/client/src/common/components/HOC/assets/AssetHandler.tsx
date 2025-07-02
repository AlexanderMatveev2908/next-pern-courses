/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import BounceErr from "../../elements/BounceErr";
import { resp } from "@/core/lib/style";

type PropsType = {
  isError: boolean;
  loaded: boolean;
};

const AssetHandler: FC<PropsType> = ({ loaded, isError }) => {
  return (
    <>
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

      {isError && (
        <div
          className="w-full h-full flex flex-col gap-3 justify-center items-center py-3 rounded-2xl"
          css={css`
            border: 2px solid var(--neutral__700);
          `}
        >
          <div className="w-full flex justify-center items-center flex-col gap-2">
            <span className="txt__md text-red-600">Error loading data</span>
          </div>

          <BounceErr
            {...{
              $customCSS: {
                css: css`
                  min-width: 75px;
                  min-height: 75px;

                  ${resp("sm")} {
                    min-width: 100px;
                    min-height: 100px;
                  }
                `,
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default AssetHandler;
