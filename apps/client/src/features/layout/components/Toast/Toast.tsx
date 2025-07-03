/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useRef, type FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { btnColors } from "@/core/uiFactory/style";
import { useDispatch, useSelector } from "react-redux";
import { getToastState, toastSlice } from "./slice";
import { css } from "@emotion/react";
import { resp } from "@/core/lib/style";
import { clearT } from "../../../../core/lib/etc";
import { varToast } from "./uiFactory";
import { __cg } from "@shared/first/lib/logger";

const Toast: FC = ({}) => {
  const toastState = useSelector(getToastState);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevStatus = useRef<boolean>(false);
  const predID = useRef<string>(toastState.id);
  const forcingRef = useRef<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const listen = () => {
      if (!toastState.isShow || prevStatus.current) return;

      __cg("stage 1 ");

      clearT(timerRef);

      predID.current = toastState.id;
      prevStatus.current = true;

      timerRef.current = setTimeout(() => {
        dispatch(toastSlice.actions.close());
        clearT(timerRef);
        prevStatus.current = false;
      }, 3000);
    };

    listen();

    return () => {
      clearT(timerRef);
    };
  }, [toastState.isShow, dispatch, toastState.id]);

  useEffect(() => {
    const listen = () => {
      if (
        !toastState.isShow ||
        !prevStatus.current ||
        forcingRef.current ||
        predID.current === toastState.id
      )
        return;

      __cg("stage 2");

      clearT(timerRef);

      prevStatus.current = false;
      forcingRef.current = true;
      predID.current = toastState.id;

      dispatch(toastSlice.actions.close());
    };

    listen();
  }, [toastState.isShow, toastState.toast, toastState.id, dispatch]);

  useEffect(() => {
    const listen = () => {
      if (!forcingRef.current || toastState.isShow || prevStatus.current)
        return;

      __cg("stage 3");

      clearT(timerRef);

      forcingRef.current = false;
      predID.current = toastState.id;

      timerRef.current = setTimeout(() => {
        dispatch(toastSlice.actions.force());
        clearT(timerRef);
      }, 400);
    };

    listen();
  }, [toastState.isShow, dispatch, toastState.id]);

  const clr = btnColors[toastState.toast.type];

  return (
    <AnimatePresence>
      {toastState.isShow && (
        <motion.div
          key={toastState.id}
          className="z__toast fixed top-5 right-5 border-[3px] border-neutral-600 pb-6 px-5 rounded-2xl bg-[#000] grid grid-cols-1 gap-3 overflow-hidden"
          css={css`
            width: 90%;

            ${resp(400)} {
              width: 400px;
            }
            ${resp(600)} {
              width: 500px;
            }
            ${resp(800)} {
              width: 600px;
            }
          `}
          initial={"hidden"}
          variants={varToast}
          custom={toastState.isShow}
          animate="open"
          exit="close"
        >
          <div className="w-full flex justify-between items-center pt-2">
            <span
              className="txt__xl"
              css={css`
                color: ${clr};
              `}
            >
              {toastState.toast.type?.toUpperCase()}
            </span>

            <button
              onClick={() => {
                dispatch(toastSlice.actions.close());
                clearT(timerRef);
                prevStatus.current = false;
              }}
              className="btn__app text-red-600"
              style={
                {
                  "--scale__up": 1.3,
                } as React.CSSProperties
              }
            >
              <X className="w-[40px] h-[40px]" />
            </button>
          </div>

          <div className="w-full flex justify-center">
            <span className="txt__md text-neutral-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              harum omnis fugiat amet quisquam aliquid molestias
            </span>
          </div>

          <motion.div
            className="w-full absolute bottom-0 left-0 h-[7.5px] rounded-2xl"
            css={css`
              background: ${clr};
            `}
            initial={{ width: "100%" }}
            transition={{
              duration: toastState.isShow ? 3 : 0,
              ease: "linear",
            }}
            animate={{
              width: toastState.isShow ? 0 : "100%",
            }}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
