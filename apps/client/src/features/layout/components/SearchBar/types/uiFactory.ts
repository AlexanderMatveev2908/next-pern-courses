import { FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons/lib";

export type OptionFilterCheckType = {
  id: string;
  label: string;
  val: string;
};

export type SearchFilterType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  label: string;
  Svg: IconType;
  id: string;
  options: OptionFilterCheckType[];
};

export type OptionSortType = "ASC" | "DESC";

export type SearchSortType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  label: string;
  Svg: IconType;
  id: string;
};
