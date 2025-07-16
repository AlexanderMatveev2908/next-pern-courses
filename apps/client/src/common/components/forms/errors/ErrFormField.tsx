/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import { FieldErrors, FieldValues, Path } from "react-hook-form";
import { isStr } from "@shared/first/lib/dataStructure";
import { useEffect, useState } from "react";
import { SerializedStyles } from "@emotion/react";
import Tooltip from "../../elements/Tooltip";

type PropsType<T extends FieldValues> = {
  errors?: FieldErrors<T>;
  el?: {
    name: string;
    field?: string;
  };
  $customCSS?: {
    css: SerializedStyles;
  };
  index?: number;
  rootErr?: string;
  manualErr?: string;
};

const ErrFormField = <T extends FieldValues>({
  el,
  errors,
  $customCSS,
  index,
  manualErr,
}: PropsType<T>) => {
  const [prevErr, setPrevErr] = useState<string | null>(null);

  const defMsg = errors?.[el?.name as Path<T>]?.message as string | undefined;
  const msg = isStr(manualErr)
    ? manualErr
    : typeof index === "number"
      ? ((errors as any)?.[(el as FormFieldType<T>)?.field as string]?.[index]
          ?.val?.message as string | undefined)
      : defMsg;

  useEffect(() => {
    if ((!isStr(prevErr) && isStr(msg)) || (isStr(msg) && msg !== prevErr)) {
      setPrevErr(msg as string);
    }
  }, [prevErr, msg]);

  return (
    <Tooltip
      {...{
        isHover: isStr(msg),
        txt: prevErr,
        $borderClr: "red__600",
        $txtClr: "red__600",
        $customCSS,
      }}
    />
  );
};

export default ErrFormField;

// <motion.div
//   initial={{ opacity: 0, transform: "translateY(0%)" }}
//   transition={{ duration: 0.3, ease: easeInOut }}
//   animate={{
//     opacity: isStr(msg) ? 1 : 0,
//     transform: isStr(msg) ? "translateY(-150%)" : "translateY(0%)",
//   }}
//   css={css`
//     ${$customCSS?.css ??
//     `
//       right: 5%;
//     `}
//   `}
//   className="absolute top-0 w-full h-fit border-2 border-red-600 max-w-fit py-1 px-5 pointer-events-none z-60 bg-[#000] rounded-xl"
// >
//   <div className="w-full flex justify-center">
//     <span className="txt__md text-red-600">{prevErr}</span>
//   </div>

//   <div className="w-[40px] h-[40px] absolute right-[10%] top-full overflow-hidden">
//     <div className="absolute w-[40px] h-[40px] border-red-600 border-2 rotate-45 bg-[#000] translate-y-[-50%] -top-[6px]"></div>
//   </div>
// </motion.div>
