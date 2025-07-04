/** @jsxImportSource @emotion/react */
"use client";

import { useCallback, useEffect, useRef, type FC } from "react";
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

  // ? for these kind of things i prefer a lot much the refs because a small bug in the flow of toast could lead to total arrest of application for infinite loops due to bad management of sync of states
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevStatus = useRef<boolean>(false);
  const prevID = useRef<string>(toastState.id);
  const forcingRef = useRef<boolean>(false);

  const dispatch = useDispatch();

  // ? the clickClose determine the final arch of animation , close the toast and inside slice i clear the id ,then here i clear timeoutID as always
  const clickClose = useCallback(() => {
    dispatch(toastSlice.actions.close());
    clearT(timerRef);
    prevStatus.current = false;
  }, [dispatch]);

  useEffect(() => {
    const listen = () => {
      // ? if toast is already shown or figure as prev skip so it can be managed properly by stage 2 or 3
      if (!toastState.isShow || prevStatus.current) return;

      __cg("stage 1 ");

      clearT(timerRef);

      // ? determine toast is currently visible and running as animation
      prevID.current = toastState.id;
      prevStatus.current = true;

      timerRef.current = setTimeout(() => {
        clickClose();
      }, 3000);
    };

    listen();

    // ? cleanup
    return () => {
      clearT(timerRef);
    };
  }, [toastState.isShow, clickClose, toastState.id]);

  useEffect(() => {
    const listen = () => {
      // ? here is pretty important to build as many bridges as possible, is pretty uncomfortable to see the toast close and then open for first renders even it should not be forced
      if (
        !toastState.isShow ||
        !prevStatus.current ||
        forcingRef.current ||
        prevID.current === toastState.id
      )
        return;

      __cg("stage 2");

      clearT(timerRef);

      prevStatus.current = false;
      forcingRef.current = true;

      dispatch(toastSlice.actions.close());
    };

    listen();
  }, [toastState.isShow, toastState.toast, toastState.id, dispatch]);

  useEffect(() => {
    const listen = () => {
      // ? here beside the fact i am checking it to be in force mode is important to check prevStatus to avoid opening the toast that first need to be closed in stage 2
      if (!forcingRef.current || toastState.isShow || prevStatus.current)
        return;

      __cg("stage 3");

      clearT(timerRef);

      forcingRef.current = false;

      timerRef.current = setTimeout(() => {
        dispatch(toastSlice.actions.force());
        clearT(timerRef);
      }, 400);
    };

    listen();

    return () => {
      clearT(timerRef);
    };
  }, [toastState.isShow, dispatch, toastState.id]);

  const clr = btnColors[toastState.toast.type];

  return (
    <AnimatePresence>
      {toastState.isShow && (
        <motion.div
          key={toastState.id}
          className="z__toast fixed top-5 right-5 pb-6 px-5 rounded-2xl bg-[#000] grid grid-cols-1 gap-3 overflow-hidden"
          css={css`
            width: 90%;
            border: 3px solid ${clr};

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
              onClick={clickClose}
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
            <span className="txt__lg text-neutral-200">
              {toastState.toast.msg}
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
