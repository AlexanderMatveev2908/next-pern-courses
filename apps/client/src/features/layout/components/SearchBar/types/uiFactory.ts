import { FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons/lib";

export type OptionFilterCheckType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  id: string;
  label: string;
  val: string;
  type: "checkbox" | "radio";
};

export type SearchFilterType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  label: string;
  Svg: IconType;
  id: string;
  options: OptionFilterCheckType<T, K>[];
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
