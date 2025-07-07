import { Coding, Grade } from "@/common/components/SVGs";
import { FormFieldArrayType } from "@/common/types/uiFactory";
import { genArrFromConst } from "@/core/lib/etc";
import {
  SearchFilterType,
  SearchSortType,
} from "@/features/layout/components/SearchBar/types/uiFactory";
import { Difficulties, TechStack } from "@shared/first/constants/categories.js";
import { SchemaGetListCoursesType } from "@shared/first/paperwork/courses/schema.get.js";
import { IoCalendarNumberSharp } from "react-icons/io5";
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
  Svg: Grade,
  id: v4(),
  options: genArrFromConst(Difficulties),
};

const filterTech: SearchFilterType<SchemaGetListCoursesType, "techStack"> = {
  name: "techStack",
  label: "Tech stack",
  Svg: Coding,
  id: v4(),
  options: genArrFromConst(TechStack),
};

export const filtersCourses = [filterTech, filterGrade];

const sortCreatedAt: SearchSortType<SchemaGetListCoursesType, "createdAtSort"> =
  {
    name: "createdAtSort",
    label: "Created at",
    Svg: IoCalendarNumberSharp,
    id: v4(),
  };

export const sortersCourses = [sortCreatedAt];
