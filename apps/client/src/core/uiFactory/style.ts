import { BtnActType } from "@/common/types/uiFactory";
import { IoTriangleSharp } from "react-icons/io5";
import { MdPentagon } from "react-icons/md";
import { BsFillHexagonFill } from "react-icons/bs";

export const btnColors = {
  [BtnActType.SUCCESS]: "var(--green__600)",
  [BtnActType.INFO]: "var(--blue__600)",
  [BtnActType.WARNING]: "var(--yellow__600)",
  [BtnActType.ERROR]: "var(--red__600)",
  [BtnActType.NEUTRAL]: "var(--neutral__300)",
};

export const difficultiesAssets = {
  BEGINNER: {
    clr: "var(--green__600)",
    Svg: IoTriangleSharp,
  },
  INTERMEDIATE: {
    clr: "var(--orange__600)",
    Svg: MdPentagon,
  },
  ADVANCED: {
    clr: "var(--red__600)",
    Svg: BsFillHexagonFill,
  },
};
