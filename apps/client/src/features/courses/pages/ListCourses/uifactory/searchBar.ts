import { genArrFromConst } from "@/core/lib/etc";
import {
  DynamicSubCategoryType,
  SearchFilterType,
  SearchSortType,
} from "@/features/layout/components/SearchBar/types/uiFactory";
import {
  GradePkg,
  StackPkg,
  TechNormPkg,
  TechPkg,
} from "@shared/first/constants/categories.js";
import { SchemaGetListCoursesType } from "@shared/first/paperwork/courses/schema.get.js";
import { Rocket } from "lucide-react";
import { IoCalendarNumberSharp, IoStatsChart } from "react-icons/io5";
import { v4 } from "uuid";
import { GrScorecard } from "react-icons/gr";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { ArrayPath, Path } from "react-hook-form";
import { FieldDataType } from "@/common/types/uiFactory";

export const txtInputsCourses = [
  {
    name: "title" as ArrayPath<SchemaGetListCoursesType>,
    label: "Title",
  },
].map((el) => ({
  ...el,
  type: "text" as Exclude<FieldDataType, "file">,
  field: "txtInputs" as Path<SchemaGetListCoursesType>,
  val: "",
  id: v4(),
  required: false,
}));

const filterGrade: SearchFilterType<SchemaGetListCoursesType, "grade"> = {
  name: "grade",
  label: "Grade",
  Svg: IoStatsChart,
  id: v4(),
  options: genArrFromConst(GradePkg, "grade"),
};

const filterStack: SearchFilterType<SchemaGetListCoursesType, "stack"> = {
  name: "stack",
  label: "Stack",
  Svg: Rocket,
  id: v4(),
  options: genArrFromConst(StackPkg, "stack"),
};

export const filtersCourses = [filterGrade, filterStack];

const dynamicFilterTech: DynamicSubCategoryType<
  SchemaGetListCoursesType,
  "tech"
> = {
  filter: {
    name: "tech",
    label: "Tech",
    Svg: Rocket,
    id: v4(),
    options: genArrFromConst(TechNormPkg, "tech"),
  },
  keyDependsOn: "stack",
  rawObj: TechPkg,
};

export const dynamicFiltersCourses = [dynamicFilterTech];

const sortCreatedAt: SearchSortType<SchemaGetListCoursesType, "createdAtSort"> =
  {
    name: "createdAtSort",
    label: "Created at",
    Svg: IoCalendarNumberSharp,
    id: v4(),
  };

const sortPoints: SearchSortType<SchemaGetListCoursesType, "pointsGainedSort"> =
  {
    name: "pointsGainedSort",
    label: "Points",
    Svg: GrScorecard,
    id: v4(),
  };

const timeEstimatedSort: SearchSortType<
  SchemaGetListCoursesType,
  "timeEstimatedSort"
> = {
  name: "timeEstimatedSort",
  label: "Time estimated",
  Svg: FaRegHourglassHalf,
  id: v4(),
};

export const sortersCourses = [sortCreatedAt, timeEstimatedSort, sortPoints];
