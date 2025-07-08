import { FieldCheckValType } from "@/common/types/uiFactory";
import { FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons/lib";

export type SearchFilterType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  label: string;
  Svg: IconType;
  id: string;
  options: FieldCheckValType<T, K>[];
};

export type OptionSortType = "ASC" | "DESC";

export type SearchSortType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  label: string;
  Svg: IconType;
  id: string;
};

export type NestedRecord = {
  [key: string]: string | NestedRecord;
};

export type InnerJoinFilterConfType<
  T extends FieldValues,
  K extends Path<T>,
> = {
  filter: SearchFilterType<T, K>;
  keyDependsOn: Path<T>;
  parentFilterToSync: NestedRecord;
};
