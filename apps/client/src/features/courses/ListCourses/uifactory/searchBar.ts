import SvgTools from "@/common/components/SVGs/Tools";
import { FormFieldArrayType } from "@/common/types/uiFactory";
import { genArrFromConst } from "@/core/lib/etc";
import {
  InnerJoinFilterConfType,
  SearchFilterType,
  SearchSortType,
} from "@/features/layout/components/SearchBar/types/uiFactory";
import {
  Difficulties,
  TechStack,
  Tools,
} from "@shared/first/constants/categories.js";
import { SchemaGetListCoursesType } from "@shared/first/paperwork/courses/schema.get.js";
import { Rocket } from "lucide-react";
import { IoCalendarNumberSharp, IoStatsChart } from "react-icons/io5";
import { v4 } from "uuid";

export const txtInputsCourses: FormFieldArrayType[] = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "test",
    label: "Test",
  },
  {
    name: "test2",
    label: "Test2",
  },
  {
    name: "test3",
    label: "Test4",
  },
].map((el) => ({
  ...el,
  type: "text",
  field: "txtInputs",
  val: "",
  id: v4(),
}));

const filterGrade: SearchFilterType<SchemaGetListCoursesType, "grade"> = {
  name: "grade",
  label: "Grade",
  Svg: IoStatsChart,
  id: v4(),
  options: genArrFromConst(Difficulties, "grade"),
};

const filterTech: SearchFilterType<SchemaGetListCoursesType, "techStack"> = {
  name: "techStack",
  label: "Tech stack",
  Svg: Rocket,
  id: v4(),
  options: genArrFromConst(TechStack, "techStack"),
};

export const filtersCourses = [filterGrade, filterTech];

const sortCreatedAt: SearchSortType<SchemaGetListCoursesType, "createdAtSort"> =
  {
    name: "createdAtSort",
    label: "Created at",
    Svg: IoCalendarNumberSharp,
    id: v4(),
  };

export const sortersCourses = [sortCreatedAt];

const innerJoinToolsFilter: SearchFilterType<
  SchemaGetListCoursesType,
  "tools"
> = {
  name: "tools",
  label: "Tools",
  Svg: SvgTools,
  id: v4(),
  options: Object.values(Tools).flatMap((v) =>
    Object.entries(v).map((pair) => ({
      name: "tools",
      id: v4(),
      label: pair[1],
      val: pair[0],
      type: "checkbox",
    })),
  ),
};

const innerJoinFilterTools: InnerJoinFilterConfType<
  SchemaGetListCoursesType,
  "tools"
> = {
  keyDependsOn: "techStack",
  filter: innerJoinToolsFilter,
  parentFilterToSync: Tools,
};

export const innerJoinFilters = [innerJoinFilterTools];
