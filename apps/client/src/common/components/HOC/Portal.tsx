/** @jsxImportSource @emotion/react */
"use client";

import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import { ReactNode, type FC } from "react";
import { createPortal } from "react-dom";

type PropsType = {
  children: ReactNode;
};

const Portal: FC<PropsType> = ({ children }) => {
  const { isHydrated } = useListenHydration();
  if (!isHydrated) return null;

  const portalRoot = document.getElementById("portal-root") ?? document.body;

  return createPortal(children, portalRoot);
};

export default Portal;
