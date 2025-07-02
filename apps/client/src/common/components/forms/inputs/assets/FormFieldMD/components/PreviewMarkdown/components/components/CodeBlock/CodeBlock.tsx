/** @jsxImportSource @emotion/react */
"use client";

import { Components, ExtraProps } from "react-markdown";
import BlockCodeOnly from "./components/BlockCodeOnly/BlockCodeOnly";
import { HTMLAttributes } from "react";

type PropsType = HTMLAttributes<HTMLElement> & ExtraProps;

const CodeBlock: Components["code"] = ({
  className = "",
  children,
}: PropsType) => {
  const isInline = !(className ?? "").includes("language-");

  return isInline ? (
    <code className={className}>{children}</code>
  ) : (
    <BlockCodeOnly>{children}</BlockCodeOnly>
  );
};

export default CodeBlock;
