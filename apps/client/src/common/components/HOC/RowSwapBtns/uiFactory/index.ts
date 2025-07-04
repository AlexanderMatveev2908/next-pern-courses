import { BtnActType } from "@/common/types/uiFactory";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { v4 } from "uuid";

export const rowBtns = [
  {
    Svg: ArrowBigLeftDash,
  },
  {
    Svg: ArrowBigRightDash,
  },
].map((el) => ({
  ...el,
  type: "button",
  btnActType: BtnActType.NEUTRAL,
  id: v4(),
}));
