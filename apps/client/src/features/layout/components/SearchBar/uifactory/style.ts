import { FieldCheckValType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { ArrowDown10, ArrowUp10 } from "lucide-react";
import { FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons/lib";
import { v4 } from "uuid";

export const svgSearchBarCSS = {
  css: css`
    width: 30px;
    height: 30px;
  `,
};

export const genDefSortFields = <T extends FieldValues, K extends Path<T>>(
  name: K,
): (FieldCheckValType<T, K> & {
  Svg: IconType;
})[] =>
  ["ASC", "DESC"].map((v, i) => ({
    val: v,
    label: v,
    name: name as K,
    id: v4(),
    type: "radio",
    Svg: !i ? ArrowUp10 : ArrowDown10,
  }));
